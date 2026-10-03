---
title: "Division, District and Upazila data of Bangladesh for Laravel application"
date: "2019-11-27"
slug: "division-district-and-upazila-data-of-bangladesh-for-laravel-application"
categories: ["General"]
excerpt: "I was developing a Laravel app that required the Division, District and Upazila data.Before this, several times I manually created database table and imported sql data from https://github.com/nuhil/bangladesh-geocode So no more manual works again. I created a package for Laravel application so that I can just user few command to get all desired data.Install using [...]"
draft: false
---

I was developing a Laravel app that required the Division, District and Upazila data.  
Before this, several times I manually created database table and imported sql data from [https://github.com/nuhil/bangladesh-geocode](https://github.com/nuhil/bangladesh-geocode)

So no more manual works again. I created a package for Laravel application so that I can just user few command to get all desired data.  
Install using composer

```php
composer require devfaysal/laravel-bangladesh-geocode
```

Then publish the migrations and seeders

```php
php artisan vendor:publish --provider="Devfaysal\BangladeshGeocode\BangladeshGeocodeServiceProvider"
```

Then run the migration

```php
php artisan migrate
```

Run seeder

```php
php artisan db:seed --class=DivisionSeeder

php artisan db:seed --class=DistrictSeeder

php artisan db:seed --class=UpazilaSeeder
```

Github repo: [https://github.com/devfaysal/laravel-bangladesh-geocode](https://github.com/devfaysal/laravel-bangladesh-geocode)

Usage  
Literally any Laravel model functions can be used

```php
use Devfaysal\BangladeshGeocode\Models\Division;

use Devfaysal\BangladeshGeocode\Models\District;

use Devfaysal\BangladeshGeocode\Models\Upazila;

 

$divisions = Division::all();

$districts = District::all();

$upazilas = Upazila::all();

 

$division = Division::find(1);

$districts = $division->districts;

 

$district = District::find(1);

$upazilas = $district->upazilas;

 

//Use any Laravel model functions...
```
