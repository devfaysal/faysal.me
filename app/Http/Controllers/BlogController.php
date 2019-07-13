<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::where('published', true)
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        return view('blog.index', [
            'posts' => $posts
        ]);
    }
}
