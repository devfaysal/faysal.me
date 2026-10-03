---
title: "Code statistics of Laravel Application"
date: "2020-01-21"
slug: "code-statistics-of-laravel-application"
categories: ["Programming"]
excerpt: "Recently I have seen a tweet of @dhh, creator of Ruby on Rails that showing code statistics of one of his recent project. I was wondering if Laravel has anything like that. I tweeted mentioning several Laravel devs and found a nice package which did similar stats that I have seen from DHH.Install the package: [...]"
draft: false
---

Recently I have seen a tweet of [@dhh](https://twitter.com/dhh/status/1219320737430827008), creator of Ruby on Rails that showing code statistics of one of his recent project. I was wondering if Laravel has anything like that.

I tweeted mentioning several Laravel devs and found a nice package which did similar stats that I have seen from DHH.  
Install the package: [https://github.com/stefanzweifel/laravel-stats](https://github.com/stefanzweifel/laravel-stats)  
Then run:

```php
php artisan stats
```

It will return total number of Classes, Controllers, Models, Tests etc as well as number of methods per class, line of codes per methods etc.

These statistics are helpful to see the overview of an applications code style.[](/privacy-policy)
