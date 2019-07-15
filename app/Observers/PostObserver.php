<?php

namespace App\Observers;

use App\Post;
use Illuminate\Support\Str;
use GrahamCampbell\Markdown\Facades\Markdown;
use Spatie\ResponseCache\Facades\ResponseCache;

class PostObserver
{

    public function creating(Post $post)
    {
        $post->author = 'Faysal Ahamed';

        $markup = Markdown::convertToHtml($post->content);

        $post->excerpt = Str::limit(strip_tags($markup), 200, ' ...');

        if($post->published){
            $post->published_at  = date(time());
        }
    }


    /**
     * Handle the post "created" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function created(Post $post)
    {
        //
    }

    /**
     * Handle the post "updated" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function updated(Post $post)
    {
        ResponseCache::forget($post->path());
    }

    /**
     * Handle the post "deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function deleted(Post $post)
    {
        ResponseCache::forget($post->path());
    }

    /**
     * Handle the post "restored" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function restored(Post $post)
    {
        //
    }

    /**
     * Handle the post "force deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function forceDeleted(Post $post)
    {
        //
    }
}
