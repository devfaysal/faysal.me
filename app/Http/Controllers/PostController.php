<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Statamic\Entries\Entry;

class PostController extends Controller
{
    public function show($slug)
    {
        $post = Entry::query()
            ->where('collection', 'posts')
            ->where('slug', $slug)->first();
        return view('posts.show', [
            'post' => $post
        ]);
    }
}
