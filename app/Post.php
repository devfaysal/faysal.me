<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GrahamCampbell\Markdown\Facades\Markdown;

class Post extends Model
{
    public $dates = ['published_at'];

    protected $attributes = [
        'author' => 'Faysal Ahamed',
    ];

    public function processed_content()
    {
        return Markdown::convertToHtml($this->content);
    }
}
