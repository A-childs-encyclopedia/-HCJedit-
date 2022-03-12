Welcome to HCJedit! [![Build Status](https://travis-ci.org/adobe.svg?branch=master)](https://travis-ci.org/adobe/HCJedit)
-------------------

HCJedit is a modern open-source code editor for HTML, CSS
and JavaScript that's *built* in HTML, CSS and JavaScript.

This is a fork of a [project](https://github.com/adobe/Brackets) previously maintained by Adobe.
We might change names in the future.

What makes HCJedit different from other web code editors?

* **Tools shouldn't get in your way.** Instead of cluttering up your coding
environment with lots of panels and icons, the Quick Edit UI in HCJedit puts 
context-specific code and tools inline.
* **HCJedit is in sync with your browser.** With Live Preview, HCJedit
works directly with your browser to push code edits instantly and jump
back and forth between your real source code and the browser view.


How to install and run HCJedit
-------------------------------
#### Download

Installers for the latest stable build for Mac, Windows and Linux (Debian/Ubuntu) can be [downloaded here](https://Brackets-cont.github.io/).

#### Usage

By default, HCJedit opens a folder containing some simple "Getting Started" content.
You can choose a different folder to edit using *File > Open Folder*.

Most of HCJedit should be pretty self-explanatory, but for information on how
to use its unique features, like Quick Edit and Live Preview, please read
[How to Use HCJedit](http://github.com/Brackets-cont/Brackets/wiki/How-to-Use-Brackets). 
Also, see the [release notes](http://github.com/Brackets-cont/Brackets/wiki/Release-Notes)
for a list of new features and known issues in each build.

In addition to the core features built into HCJedit, there is a large and growing
community of developers building extensions that add all sorts of useful functionality.
See the [HCJedit Extension Registry](https://registry.Brackets.io/)
for a list of available extensions. For installation instructions,
see the [extensions wiki page](https://github.com/Brackets-cont/HCJedit/wiki/Brackets-Extensions).

#### Need help?

Having problems starting HCJedit the first time, or not sure how to use HCJedit?  Please 
review [Troubleshooting](https://github.com/Brackets-cont/Brackets/wiki/Troubleshooting), which helps 
you to fix common problems and find extra help if needed.

Helping HCJedit
----------------

#### I found a bug!

If you found a repeatable bug, and [troubleshooting](https://github.com/Brackets-cont/Brackets/wiki/Troubleshooting) 
tips didn't help, then be sure to [search existing issues](https://github.com/Brackets-cont/Brackets/issues) first.
Include steps to consistently reproduce the problem, actual vs. expected results, screenshots, and your OS and
HCJedit version number. Disable all extensions to verify the issue is a core HCJedit bug.
[Read more guidelines for filing good bugs.](https://github.com/Brackets-cont/Brackets/wiki/How-to-Report-an-Issue)


#### I have a new suggestion, but don't know how to program!

For feature requests please first check our [Trello board](http://bit.ly/BracketsBacklog) to
see if it's already there; you can upvote it if so. If not, feel free to file it as an issue as above; we'll
move it to the feature backlog for you.


#### I want to help with the code!

Awesome! _There are lots of ways you can help._ First read 
[CONTRIBUTING.md](https://github.com/Brackets-cont/Brackets/blob/master/CONTRIBUTING.md), 
then learn how to [pull the repo and hack on HCJedit](https://github.com/Brackets-cont/Brackets/wiki/How-to-Hack-on-Brackets).

The text editor inside HCJedit is based on 
[CodeMirror](http://github.com/codemirror/CodeMirror)&mdash;thanks to Marijn for
taking our pull requests, implementing feature requests and fixing bugs! See 
[Notes on CodeMirror](https://github.com/Brackets-cont/HCJedit/wiki/Notes-on-CodeMirror)
for info on how we're using CodeMirror.

Although HCJedit is built in HTML/CSS/JS, it currently runs as a desktop 
application in a thin native shell, so that it can access your local files.
(If you just try to open the index.html file in a browser, it won't work yet.)
The native shell for HCJedit lives in a separate repo, 
[HCJedit-cont/HCJedit-shell](https://github.com/Brackets-cont/Brackets-shell/).

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/Brackets-cont/Brackets/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
