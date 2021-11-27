<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Statamic\Entries\Entry;

class PostController extends Controller
{
    public function show($slug)
    {
        $post = Entry::query()->where('slug', $slug)->first();
        // dd($post->date()->toIso8601String());
        // dd(Carbon::createFromTimestamp($post->updated_at)->toIso8601String());
        return view('posts.show', [
            'post' => $post
        ]);
    }
}
