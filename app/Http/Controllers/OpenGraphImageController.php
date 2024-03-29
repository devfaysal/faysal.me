<?php

namespace App\Http\Controllers;

use GDText\Box;
use GDText\Color;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Statamic\Entries\Entry;

class OpenGraphImageController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $post = Entry::query()->where('slug', $slug)->first();
        $blog = 'Faysal Ahamed';
        $title = $post->title;
        $time = $this->readingTime($post->content);
        $key = md5("opengraph.{$blog}.{$title}.{$time}");

        $image = Cache::remember($key, now()->addDays(1), function () use ($blog, $title, $time) {
            $image = imagecreatetruecolor(1200, 630);
            $backgroundColor = imagecolorallocate($image, 246, 173, 85);
            imagefill($image, 0, 0, $backgroundColor);

            $box = new Box($image);
            $box->setTextAlign('left', 'top');

            $border = 40;

            // user
            $box->setFontFace(
                resource_path('fonts/Inter-Regular.otf')
            );
            $box->setFontColor(new Color(102, 102, 102));
            $box->setFontSize(38);
            $box->setBox($border, $border, 1200 - $border - $border, 630 - $border - $border);
            $box->draw($blog);

            // title
            $box->setFontFace(
                resource_path('fonts/Inter-Medium.otf')
            );
            $box->setFontColor(new Color(255, 255, 255));
            $box->setFontSize(64);
            $box->setBox($border, $border + 80, 1200 - $border - $border, 630 - 120 - $border);
            $box->draw($title);

            // reading time
            $box->setFontFace(
                resource_path('fonts/Inter-Regular.otf')
            );
            $box->setFontColor(new Color(102, 102, 102));
            $box->setFontSize(38);
            $box->setBox($border, 630 - $border - 38*1.3, 1200 - $border - $border, 630 - $border - $border);
            $box->draw($time);

            ob_start();
            imagepng($image);
            return ob_get_clean();
        });

        return response($image, 200)
            ->header('Content-Type', 'image/png');
    }

    public function readingTime($content)
    {
        $time = (int)ceil(str_word_count(strip_tags($content)) / 200);
        $text = Str::plural('minute', $time);
        return $time . ' ' . $text . ' read';
    }
}
