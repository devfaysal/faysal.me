<?php

namespace App\Providers;

use App\IslamicPost;
use App\Observers\IslamicPostObserver;
use App\Observers\PostObserver;
use App\Post;
use Illuminate\Support\ServiceProvider;
use Statamic\Entries\Entry;
use Statamic\Facades\Markdown;
use Statamic\StaticSite\SSG;
use Torchlight\Commonmark\V2\TorchlightExtension;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Markdown::addExtension(function () {
            return new TorchlightExtension;
        });
        SSG::addUrls(function () {
            return $this->dynamicUrls();
        });
    }

    public function dynamicUrls()
    {
        $posts = Entry::query()
            ->where('collection', 'posts')
            ->where('published', true)
            ->get();
        $urls = [];
        foreach($posts as $post){
            $urls[] = route('posts.show', $post->slug());
            $urls[] = route('posts.show.old', $post->slug());
        }

        return $urls;
    }
}
