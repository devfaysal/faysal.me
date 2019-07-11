<?php

namespace App;

use Spatie\Tags\HasTags;
use Illuminate\Database\Eloquent\Model;
use GrahamCampbell\Markdown\Facades\Markdown;

class Post extends Model
{

    use HasTags;

    public $with = ['tags'];

    public $dates = ['published_at'];

    protected $attributes = [
        'author' => 'Faysal Ahamed',
    ];

    public function processed_content()
    {
        return Markdown::convertToHtml($this->content);
    }
}
