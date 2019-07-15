<?php

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AboutController;
use GrahamCampbell\Markdown\Facades\Markdown;
use Spatie\ResponseCache\Facades\ResponseCache;

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

// Route::get('/test', function(){

// });

//To cache route use ->middleware('cacheResponse:300')

Route::redirect('/nova', '/nova/login');

Route::get('/', [HomeController::class, 'index']);

Route::get('/about', [AboutController::class, 'index']);

Route::get('/blog', [BlogController::class, 'index']);

Route::get('/{post}', [PostController::class, 'show']);