@extends('layouts.app')

@section('content')
    @include('posts.partials.post', [
        'class' => 'mb-4'
    ])
    @include('posts.partials.disqus')
@endsection