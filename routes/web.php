<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IslamicPostController;
use App\Http\Controllers\OpenGraphImageController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Storage;
use Spatie\ResponseCache\Facades\ResponseCache;
use Statamic\Entries\Collection;
use Statamic\Entries\Entry;

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

// Route::redirect('/nova', '/nova/login');
Route::get('/test', function(){
    $entries = Entry::query()
    ->where('collection', 'posts')
    ->where('published', true)
    ->get();

    foreach($entries as $entry){
        echo $entry->title;
        echo '<br/>';
    }
});

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::view('/resume', 'resume')->name('resume');

Route::get('/about', [AboutController::class, 'index'])->name('about');

Route::get('/blog', [BlogController::class, 'index']);

// Route::get('/islam', [IslamicPostController::class, 'index']);
// Route::get('/islam/{post}', [IslamicPostController::class, 'show']);

Route::get('/posts/{slug}', [PostController::class, 'show'])->name('posts.show');
// Route::get('/posts/{post}/image.png', [OpenGraphImageController::class, 'show'])->name('socialCardImage');

// Route::statamic('/posts/{post}', 'test');