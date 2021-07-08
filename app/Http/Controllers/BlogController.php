<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Statamic\Entries\Entry;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Entry::query()
            ->where('collection', 'posts')
            ->where('published', true)
            ->orderBy('date', 'desc')
            ->get();

        return view('blog.index', [
            'posts' => $posts
        ]);
    }
}
