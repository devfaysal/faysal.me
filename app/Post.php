<?php

namespace App;

use Spatie\Tags\HasTags;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasTags;

    public $with = ['tags'];

    public $dates = ['published_at'];

    public function getRouteKeyName() 
    {
        return 'slug';
    }

    public function path()
    {
        return '/' . $this->slug;
    }

    public function getReadingTimeAttribute()
    {
        $time = (int)ceil(str_word_count(strip_tags($this->content)) / 200);
        $text = Str::plural('minute', $time);
        return $time . ' ' . $text . ' read';
    }
}
