<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::where('published', true)->get();

        return view('blog.index', [
            'posts' => $posts
        ]);
    }
}
