---
title: "Fix: phpMyadmin No activity within 1440 seconds; please log in again"
date: "2019-10-24"
slug: "fix-phpmyadmin-no-activity-within-1440-seconds-please-log-in-again"
categories: ["Web Development"]
excerpt: "Lots of developers use phpMyadmin for browsing mysql database in their development setup. By default phpMyadmin expires session if there is no activity within 1440 seconds. But in development setup, log in again and again is painful. It can be solved by updating &#8220;Login cookie validity&#8221; First login to phpMyadmin then follow the steps below: [...]"
draft: false
---

Lots of developers use phpMyadmin for browsing mysql database in their development setup. By default phpMyadmin expires session if there is no activity within 1440 seconds. But in development setup, log in again and again is painful.

It can be solved by updating "Login cookie validity" First login to phpMyadmin then follow the steps below:

1.  Go to settings
2.  Click Features tab
3.  Now you will see "Login cookie validity" and update the value as per your requirement and click Apply.

But, most probably you will see a warning when you go to the homepage of phpMyadmin.

To fix this, you need to update you php.ini file. Update the value of session.gc\_maxlifetime = 1440. You need to update the value at least equal or greater than the value of "Login cookie validity"

Then restart the web server.

Done!
