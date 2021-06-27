<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // $featured_posts = Post::where('featured', true)
        //     ->orderBy('published_at', 'desc')
        //     ->orderBy('id', 'desc')
        //     ->get();
        return view('home', [
            'featured_posts' => new Collection()
        ]);
    }
}
