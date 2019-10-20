<?php

namespace App\Http\Controllers;

use App\IslamicPost;
use Illuminate\Http\Request;

class IslamicPostController extends Controller
{
    public function index()
    {
        $posts = IslamicPost::where('published', true)
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        return view('blog.index', [
            'posts' => $posts
        ]);
    }


    public function show(IslamicPost $post)
    {
        return view('posts.show', [
            'post' => $post
        ]);
    }
}
