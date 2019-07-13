@extends('layouts.app')

@section('content')
    @foreach ($posts as $post)
        @include('posts.partials.post', [
            'class' => 'mb-8',
            'blog' => true
        ])
    @endforeach
@endsection