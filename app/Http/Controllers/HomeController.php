<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Statamic\Entries\Entry;

class HomeController extends Controller
{
    public function index()
    {
        $featured_posts = Entry::query()
        ->where('collection', 'posts')
        ->where('published', true)
        ->where('featured', true)
        ->orderBy('date', 'desc')
        ->get();
        
        return view('home', [
            'featured_posts' => $featured_posts
        ]);
    }
}
