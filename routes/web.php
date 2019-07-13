<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AboutController;
use GrahamCampbell\Markdown\Facades\Markdown;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::redirect('/nova', '/nova/login');

Route::get('/', [HomeController::class, 'index']);

Route::get('/about', [AboutController::class, 'index']);

Route::get('/blog', [BlogController::class, 'index']);

Route::get('/{post}', [PostController::class, 'show']);

Route::get('/post', function(){
    $post = App\Post::find(3);

    dd($post->tags[0]->name);

    return view('post', [
        'post' => $post
    ]);
});
