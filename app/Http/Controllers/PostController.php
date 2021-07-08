<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Statamic\Entries\Entry;

class PostController extends Controller
{
    public function show($slug)
    {
        $post = Entry::query()->where('slug', $slug)->first();
        return view('posts.show', [
            'post' => $post
        ]);
    }
}
