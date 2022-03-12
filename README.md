Welcome to HCJedit! [![Build Status](https://travis-ci.org/adobe/HCJedit.svg?branch=master)](https://travis-ci.org/adobe/HCJedit)
-------------------

HCJedit is a modern open-source code editor for HTML, CSS
and JavaScript that's *built* in HTML, CSS and JavaScript.

This is a fork of a [project](https://github.com/adobe/HCJedit) previously maintained by Adobe.
We might change names in the future.

A lot of work needs to be done to make this fork become independent. Feel free to open a PR!
Want to help coordinating the project itself? Check the projects tab ([here](https://github.com/HCJedit-cont/HCJedit/projects/1?fullscreen=true)).

What makes HCJedit different from other web code editors?

* **Tools shouldn't get in your way.** Instead of cluttering up your coding
environment with lots of panels and icons, the Quick Edit UI in HCJedit puts 
context-specific code and tools inline.
* **HCJedit is in sync with your browser.** With Live Preview, HCJedit
works directly with your browser to push code edits instantly and jump
back and forth between your real source code and the browser view.
* **Do it yourself.** Because HCJedit is open source, and built with HTML, CSS
and JavaScript, you can [help build](https://github.com/HCJedit-cont/HCJedit/blob/master/CONTRIBUTING.md) the best code editor for the web.

HCJedit may have reached version 1, but we're not stopping there. We have many feature ideas on our
[trello board](http://bit.ly/HCJeditTrelloBoard) that we're anxious to add and other
innovative web development workflows that we're planning to build into HCJedit. 
So take HCJedit out for a spin and let us know how we can make it your favorite editor. 

You can see some 
[screenshots of HCJedit](https://github.com/HCJedit-cont/HCJedit/wiki/HCJedit-Screenshots)
on the wiki, [intro videos](http://www.youtube.com/user/CodeHCJedit) on YouTube, and news on the [HCJedit blog](http://blog.HCJedit.io/).

How to install and run HCJedit
-------------------------------
#### Download

Installers for the latest stable build for Mac, Windows and Linux (Debian/Ubuntu) can be [downloaded here](https://HCJedit-cont.github.io/).

#### Usage

By default, HCJedit opens a folder containing some simple "Getting Started" content.
You can choose a different folder to edit using *File > Open Folder*.

Most of HCJedit should be pretty self-explanatory, but for information on how
to use its unique features, like Quick Edit and Live Preview, please read
[How to Use HCJedit](http://github.com/HCJedit-cont/HCJedit/wiki/How-to-Use-HCJedit). 
Also, see the [release notes](http://github.com/HCJedit-cont/HCJedit/wiki/Release-Notes)
for a list of new features and known issues in each build.

In addition to the core features built into HCJedit, there is a large and growing
community of developers building extensions that add all sorts of useful functionality.
See the [HCJedit Extension Registry](https://registry.HCJedit.io/)
for a list of available extensions. For installation instructions,
see the [extensions wiki page](https://github.com/HCJedit-cont/HCJedit/wiki/HCJedit-Extensions).

#### Need help?

Having problems starting HCJedit the first time, or not sure how to use HCJedit?  Please 
review [Troubleshooting](https://github.com/HCJedit-cont/HCJedit/wiki/Troubleshooting), which helps 
you to fix common problems and find extra help if needed.

Helping HCJedit
----------------

#### I found a bug!

If you found a repeatable bug, and [troubleshooting](https://github.com/HCJedit-cont/HCJedit/wiki/Troubleshooting) 
tips didn't help, then be sure to [search existing issues](https://github.com/HCJedit-cont/HCJedit/issues) first.
Include steps to consistently reproduce the problem, actual vs. expected results, screenshots, and your OS and
HCJedit version number. Disable all extensions to verify the issue is a core HCJedit bug.
[Read more guidelines for filing good bugs.](https://github.com/HCJedit-cont/HCJedit/wiki/How-to-Report-an-Issue)


#### I have a new suggestion, but don't know how to program!

For feature requests please first check our [Trello board](http://bit.ly/HCJeditBacklog) to
see if it's already there; you can upvote it if so. If not, feel free to file it as an issue as above; we'll
move it to the feature backlog for you.


#### I want to help with the code!

Awesome! _There are lots of ways you can help._ First read 
[CONTRIBUTING.md](https://github.com/HCJedit-cont/HCJedit/blob/master/CONTRIBUTING.md), 
then learn how to [pull the repo and hack on HCJedit](https://github.com/HCJedit-cont/HCJedit/wiki/How-to-Hack-on-HCJedit).

The text editor inside HCJedit is based on 
[CodeMirror](http://github.com/codemirror/CodeMirror)&mdash;thanks to Marijn for
taking our pull requests, implementing feature requests and fixing bugs! See 
[Notes on CodeMirror](https://github.com/HCJedit-cont/HCJedit/wiki/Notes-on-CodeMirror)
for info on how we're using CodeMirror.

Although HCJedit is built in HTML/CSS/JS, it currently runs as a desktop 
application in a thin native shell, so that it can access your local files.
(If you just try to open the index.html file in a browser, it won't work yet.)
The native shell for HCJedit lives in a separate repo, 
[HCJedit-cont/HCJedit-shell](https://github.com/HCJedit-cont/HCJedit-shell/).


I want to keep track of how HCJedit is doing!
----------------------------------------------

Not sure you needed the exclamation point there, but we like your enthusiasm.

#### What's HCJedit working on next?

* In our [feature backlog](http://bit.ly/HCJeditBacklog), the columns to the right
  (starting from "Development") list the features that we're currently working on.
  "Ready" shows what we'll be working on next.
* Watch our [GitHub activity stream](https://github.com/HCJedit-cont/HCJedit/pulse).
* The entire development process is outlined in the [Developer Guide](https://github.com/HCJedit-cont/HCJedit/wiki/HCJedit-Developers-Guide).

#### Contact info

<!-- * **E-mail:** [admin@HCJedit.io](mailto:admin@HCJedit.io)
* **Slack:** [HCJedit on Slack](https://HCJedit.slack.com) (You can join by sending a mail to [admin@HCJedit.io](mailto:admin@HCJedit.io) with the subject line `slack registration request` specifying the email addresses you would like to register).
* **Developers mailing list:** http://groups.google.com/group/HCJedit-dev
* **Twitter:** [@HCJedit](https://twitter.com/HCJedit)
* **Blog:** http://blog.HCJedit.io/
* **IRC:** [#HCJedit on freenode](http://webchat.freenode.net/?channels=HCJedit)
-->
* **Matrix:** [@HCJedit-cont:matrix.org](https://matrix.to/#/#HCJedit-cont:matrix.org)
* **Discord:** [HCJedit Discord Server](https://discord.gg/rBpTBPttca)
* **Reddit:** [r/HCJedit](https://www.reddit.com/r/HCJedit/)
---

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/HCJedit-cont/HCJedit/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
