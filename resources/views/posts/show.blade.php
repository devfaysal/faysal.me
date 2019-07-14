@extends('layouts.app', [
    'title' => $post->title
])

@section('content')
    @include('posts.partials.post', [
        'class' => 'mb-4'
    ])
    @include('posts.partials.disqus')
@endsection