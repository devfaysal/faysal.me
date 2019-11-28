<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $featured_posts = Post::where('featured', true)->get();
        return view('home', [
            'featured_posts' => $featured_posts
        ]);
    }
}
