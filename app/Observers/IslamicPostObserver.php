<?php

namespace App\Observers;

use App\IslamicPost;
use Illuminate\Support\Str;

class IslamicPostObserver
{
    public function creating(IslamicPost $islamicPost)
    {
        $islamicPost->author = 'Faysal Ahamed';

        $islamicPost->excerpt = Str::limit(strip_tags($islamicPost->content), 200, ' ...');

        if($islamicPost->published){
            $islamicPost->published_at  = date(time());
        }
    }
    /**
     * Handle the islamic post "created" event.
     *
     * @param  \App\IslamicPost  $islamicPost
     * @return void
     */
    public function created(IslamicPost $islamicPost)
    {
        //
    }

    /**
     * Handle the islamic post "updated" event.
     *
     * @param  \App\IslamicPost  $islamicPost
     * @return void
     */
    public function updated(IslamicPost $islamicPost)
    {
        //
    }

    /**
     * Handle the islamic post "deleted" event.
     *
     * @param  \App\IslamicPost  $islamicPost
     * @return void
     */
    public function deleted(IslamicPost $islamicPost)
    {
        //
    }

    /**
     * Handle the islamic post "restored" event.
     *
     * @param  \App\IslamicPost  $islamicPost
     * @return void
     */
    public function restored(IslamicPost $islamicPost)
    {
        //
    }

    /**
     * Handle the islamic post "force deleted" event.
     *
     * @param  \App\IslamicPost  $islamicPost
     * @return void
     */
    public function forceDeleted(IslamicPost $islamicPost)
    {
        //
    }
}
