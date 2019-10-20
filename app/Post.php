<?php

namespace App;

use Spatie\Tags\HasTags;
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

    public function getReadingTimeAttribute(): int
    {
        return (int)ceil(str_word_count(strip_tags($this->content)) / 200);
    }
}
