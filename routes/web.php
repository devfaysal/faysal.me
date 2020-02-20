<?php

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\IslamicPostController;
use Spatie\ResponseCache\Facades\ResponseCache;
use App\Http\Controllers\OpenGraphImageController;

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

Route::view('/resume', 'resume');

Route::get('/about', [AboutController::class, 'index']);

Route::get('/blog', [BlogController::class, 'index']);

Route::get('/islam', [IslamicPostController::class, 'index']);
Route::get('/islam/{post}', [IslamicPostController::class, 'show']);

Route::get('/{post}', [PostController::class, 'show']);
Route::get('/{post}/image.png', [OpenGraphImageController::class, 'show'])->name('socialCardImage');