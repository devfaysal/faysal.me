<?php

namespace App\Providers;

use App\IslamicPost;
use App\Observers\IslamicPostObserver;
use App\Observers\PostObserver;
use App\Post;
use Illuminate\Support\ServiceProvider;
use Statamic\Entries\Entry;
use Statamic\StaticSite\SSG;

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
        SSG::addUrls(function () {
            return $this->dynamicUrls();
        });
        Post::observe(PostObserver::class);
        IslamicPost::observe(IslamicPostObserver::class);
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
