<?php

namespace App\Nova;

use Spatie\TagsField\Tags;
use Laravel\Nova\Fields\ID;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Trix;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\Textarea;
use Benjaminhirsch\NovaSlugField\Slug;
use Infinety\Filemanager\FilemanagerField;
use Laravel\Nova\Http\Requests\NovaRequest;
use Benjaminhirsch\NovaSlugField\TextWithSlug;

class Post extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'App\Post';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'id';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id',
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),

            TextWithSlug::make('Post Title', 'title')
                ->slug('slug')
                ->rules('required'),

            Slug::make('Slug')
                ->rules('required')
                ->creationRules('unique:posts')
                ->hideFromIndex(),
            
            FilemanagerField::make('Image')->displayAsImage(),

            Text::make('Image Credit')->hideFromIndex(),
            
            Trix::make('Post Content', 'content')
                ->rules('required')
                ->withFiles('public'),

            Textarea::make('Excerpt')
                ->hideWhenCreating(),
            
            // Code::make('Styles')
            //         ->language('sass'),

            // Code::make('Scripts')
            //     ->language('javascript'),

            Tags::make('Tags'),

            Boolean::make('Published'),

            Boolean::make('Featured'),

            Text::make('Author')
                ->withMeta([
                    'value' => auth()->user()->name ?? '',
                ])
                ->hideFromIndex(),

            DateTime::make('Published at', 'published_at')->format('DD MMM YYYY'),

            Text::make('', function () {
                    if (! $this->exists) {
                        return '';
                    }

                    return '<a target="_blank" href="' . url($this->path()) . '">URL</a>';
                })->asHtml(),
            
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }
}
