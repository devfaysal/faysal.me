<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Post;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'author'    => 'Faysal Ahamed',
        'title'     => $title = $faker->sentence,
        'slug'      => Str::slug($title),
        'content'   => $faker->text(1500),
        'excerpt'   => $faker->text(200),
        'image'   => 'lorem.jpg',
        'styles'   => '',
        'scripts'   => '',
        'published' => $faker->boolean,
        'featured'  => $faker->boolean,
        'published_at'  => date(time())
    ];
});
