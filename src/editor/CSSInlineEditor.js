define(function (require, exports, module) {
    "use strict";

    // Load dependent modules
    var CSSUtils                = require("language/CSSUtils"),
        DropdownButton          = require("widgets/DropdownButton").DropdownButton,
        CommandManager          = require("command/CommandManager"),
        Commands                = require("command/Commands"),
        DocumentManager         = require("document/DocumentManager"),
        EditorManager           = require("editor/EditorManager"),
        Editor                  = require("editor/Editor").Editor,
        LanguageManager         = require("language/LanguageManager"),
        ProjectManager          = require("project/ProjectManager"),
        FileUtils               = require("file/FileUtils"),
        HTMLUtils               = require("language/HTMLUtils"),
        MultiRangeInlineEditor  = require("editor/MultiRangeInlineEditor"),
        Strings                 = require("strings"),
        ViewUtils               = require("utils/ViewUtils"),
        HealthLogger            = require("utils/HealthLogger"),
        _                       = require("thirdparty/lodash");

    var _newRuleCmd,
        _newRuleHandlers = [];

    function _getCSSFilesInProject() {
        return ProjectManager.getAllFiles(ProjectManager.getLanguageFilter(["css", "less", "scss"]));
    }

    function _getSelectorName(editor, pos) {
        var tagInfo = HTMLUtils.getTagInfo(editor, pos),
            selectorName = "",
            reason;

        if (tagInfo.position.tokenType === HTMLUtils.TAG_NAME || tagInfo.position.tokenType === HTMLUtils.CLOSING_TAG) {
            // Type selector
            selectorName = tagInfo.tagName;
        } else if (tagInfo.position.tokenType === HTMLUtils.ATTR_NAME ||
                   tagInfo.position.tokenType === HTMLUtils.ATTR_VALUE) {
            if (tagInfo.attr.name === "class") {
                // Class selector. We only look for the class name
                // that includes the insertion point. For example, if
                // the attribute is:
                //   class="error-dialog modal hide"
                // and the insertion point is inside "modal", we want ".modal"
                var attributeValue = tagInfo.attr.value;
                if (/\S/.test(attributeValue)) {
                    var startIndex = attributeValue.substr(0, tagInfo.position.offset).lastIndexOf(" ");
                    var endIndex = attributeValue.indexOf(" ", tagInfo.position.offset);
                    selectorName = "." +
                        attributeValue.substring(
                            startIndex === -1 ? 0 : startIndex + 1,
                            endIndex === -1 ? attributeValue.length : endIndex
                        );

                    // If the insertion point is surrounded by space between two classnames, selectorName is "."
                    if (selectorName === ".") {
                        selectorName = "";
                        reason = Strings.ERROR_CSSQUICKEDIT_BETWEENCLASSES;
                    }
                } else {
                    reason = Strings.ERROR_CSSQUICKEDIT_CLASSNOTFOUND;
                }
            } else if (tagInfo.attr.name === "id") {
                // ID selector
                var trimmedVal = tagInfo.attr.value.trim();
                if (trimmedVal) {
                    selectorName = "#" + trimmedVal;
                } else {
                    reason = Strings.ERROR_CSSQUICKEDIT_IDNOTFOUND;
                }
            } else {
                reason = Strings.ERROR_CSSQUICKEDIT_UNSUPPORTEDATTR;
            }
        }

        return {
            selectorName: selectorName,
            reason:       reason
        };
    }

  
    function _addRule(selectorName, inlineEditor, path) {
        DocumentManager.getDocumentForPath(path).done(function (styleDoc) {
            var newRuleInfo = CSSUtils.addRuleToDocument(styleDoc, selectorName, Editor.getUseTabChar(path), Editor.getSpaceUnits(path));
            inlineEditor.addAndSelectRange(selectorName, styleDoc, newRuleInfo.range.from.line, newRuleInfo.range.to.line);
            inlineEditor.editor.setCursorPos(newRuleInfo.pos.line, newRuleInfo.pos.ch);
        });
    }

   
    function _handleNewRule() {
        var inlineEditor = MultiRangeInlineEditor.getFocusedMultiRangeInlineEditor();
        if (inlineEditor) {
            var handlerInfo = _.find(_newRuleHandlers, function (entry) {
                return entry.inlineEditor === inlineEditor;
            });
            if (handlerInfo) {
                handlerInfo.handler();
            }
        }
    }

    /** Item renderer for stylesheet-picker dropdown */
    function _stylesheetListRenderer(item) {
        var html = "<span class='stylesheet-name'>" + _.escape(item.name);
        if (item.subDirStr) {
            html += "<span class='stylesheet-dir'> — " + _.escape(item.subDirStr) + "</span>";
        }
        html += "</span>";
        return html;
    }

    function htmlToCSSProvider(hostEditor, pos) {

        // Only provide a CSS editor when cursor is in HTML content
        if (hostEditor.getLanguageForSelection().getId() !== "html") {
            return null;
        }

        //Send analytics data for QuickEdit open
        HealthLogger.sendAnalyticsData(
            "QuickEditOpen",
            "usage",
            "quickEdit",
            "open"
        );

        // Only provide CSS editor if the selection is within a single line
        var sel = hostEditor.getSelection();
        if (sel.start.line !== sel.end.line) {
            return null;
        }

        // Always use the selection start for determining selector name. The pos
        // parameter is usually the selection end.
        var selectorResult = _getSelectorName(hostEditor, sel.start);
        if (selectorResult.selectorName === "") {
            return selectorResult.reason || null;
        }

        var selectorName = selectorResult.selectorName;

        var result = new $.Deferred(),
            cssInlineEditor,
            cssFileInfos = [],
            newRuleButton;

        /**
         * @private
         * Callback when item from dropdown list is selected
         */
        function _onDropdownSelect(event, fileInfo) {
            _addRule(selectorName, cssInlineEditor, fileInfo.fullPath);
        }

        
        function _getNoRulesMsg() {
            var result = new $.Deferred();
            _getCSSFilesInProject().done(function (fileInfos) {
                result.resolve(fileInfos.length ? Strings.CSS_QUICK_EDIT_NO_MATCHES : Strings.CSS_QUICK_EDIT_NO_STYLESHEETS);
            });
            return result;
        }

       
        function _updateCommands() {
            _newRuleCmd.setEnabled(cssInlineEditor.hasFocus() && !newRuleButton.$button.hasClass("disabled"));
        }

      
        function _handleNewRuleClick(e) {
            if (!newRuleButton.$button.hasClass("disabled")) {
                if (cssFileInfos.length === 1) {
                    // Just go ahead and create the rule.
                    _addRule(selectorName, cssInlineEditor, cssFileInfos[0].fullPath);
                } else {
                    // Although not attached to button click in 'dropdown mode', this handler can still be
                    // invoked via the command shortcut. Just toggle dropdown open/closed in that case.
                    newRuleButton.toggleDropdown();
                }
            }
        }

      
        function _fileComparator(a, b) {
            var aIsCSS = LanguageManager.getLanguageForPath(a.fullPath).getId() === "css",
                bIsCSS = LanguageManager.getLanguageForPath(b.fullPath).getId() === "css";
            if (aIsCSS && !bIsCSS) {
                return 1;
            } else if (!aIsCSS && bIsCSS) {
                return -1;
            } else {
                return FileUtils.comparePaths(a.fullPath, b.fullPath);
            }
        }

       
        function _prepFileList(files) {
            // First, sort list (the same ordering we use for the results list)
            files.sort(_fileComparator);

            // Find any files that share the same name (with different path)
            var fileNames = {};
            files.forEach(function (file) {
                if (!fileNames[file.name]) {
                    fileNames[file.name] = [];
                }
                fileNames[file.name].push(file);
            });

            // For any duplicate filenames, set subDirStr to a path snippet the helps
            // the user distinguish each file in the list.
            _.forEach(fileNames, function (files) {
                if (files.length > 1) {
                    var displayPaths = ViewUtils.getDirNamesForDuplicateFiles(files);
                    files.forEach(function (file, i) {
                        file.subDirStr = displayPaths[i];
                    });
                }
            });

            return files;
        }

        function _onHostEditorScroll() {
            newRuleButton.closeDropdown();
        }

        CSSUtils.findMatchingRules(selectorName, hostEditor.document)
            .done(function (rules) {
                var inlineEditorDeferred = new $.Deferred();
                cssInlineEditor = new MultiRangeInlineEditor.MultiRangeInlineEditor(CSSUtils.consolidateRules(rules),
                                                                                    _getNoRulesMsg, CSSUtils.getRangeSelectors,
                                                                                    _fileComparator);
                cssInlineEditor.load(hostEditor);
                cssInlineEditor.$htmlContent
                    .on("focusin", _updateCommands)
                    .on("focusout", _updateCommands);
                cssInlineEditor.on("add", function () {
                    inlineEditorDeferred.resolve();
                });
                cssInlineEditor.on("close", function () {
                    newRuleButton.closeDropdown();
                    hostEditor.off("scroll", _onHostEditorScroll);
                });

                var $header = $(".inline-editor-header", cssInlineEditor.$htmlContent);
                newRuleButton = new DropdownButton(Strings.BUTTON_NEW_RULE, [], _stylesheetListRenderer); // actual item list populated later, below
                newRuleButton.$button.addClass("disabled");  // disabled until list is known
                newRuleButton.$button.addClass("btn-mini stylesheet-button");
                $header.append(newRuleButton.$button);
                _newRuleHandlers.push({inlineEditor: cssInlineEditor, handler: _handleNewRuleClick});

                hostEditor.on("scroll", _onHostEditorScroll);

                result.resolve(cssInlineEditor);


                // Now that dialog has been built, collect list of stylesheets
                var stylesheetsPromise = _getCSSFilesInProject();

                // After both the stylesheets are loaded and the inline editor has been added to the DOM,
                // update the UI accordingly. (Those can happen in either order, so we need to wait for both.)
                // Note that the stylesheetsPromise needs to be passed first in order for the fileInfos to be
                // properly passed to the handler, since $.when() passes the results in order of the argument
                // list.
                $.when(stylesheetsPromise, inlineEditorDeferred.promise())
                    .done(function (fileInfos) {
                        cssFileInfos = _prepFileList(fileInfos);

                        // "New Rule" button is disabled by default and gets enabled
                        // here if there are any stylesheets in project
                        if (cssFileInfos.length > 0) {
                            newRuleButton.$button.removeClass("disabled");
                            if (!rules.length) {
                                // Force focus to the button so the user can create a new rule from the keyboard.
                                newRuleButton.$button.focus();
                            }

                            if (cssFileInfos.length === 1) {
                                // Make it look & feel like a plain button in this case
                                newRuleButton.$button.removeClass("btn-dropdown");
                                newRuleButton.$button.on("click", _handleNewRuleClick);
                            } else {
                                // Fill out remaining dropdown attributes otherwise
                                newRuleButton.items = cssFileInfos;
                                newRuleButton.on("select", _onDropdownSelect);
                            }
                        }

                        _updateCommands();
                    });
            })
            .fail(function (error) {
                console.warn("Error in findMatchingRules()", error);
                result.reject();
            });

        return result.promise();
    }

    EditorManager.registerInlineEditProvider(htmlToCSSProvider);

    _newRuleCmd = CommandManager.register(Strings.CMD_CSS_QUICK_EDIT_NEW_RULE, Commands.CSS_QUICK_EDIT_NEW_RULE, _handleNewRule);
    _newRuleCmd.setEnabled(false);
});
