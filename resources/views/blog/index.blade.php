@extends('layouts.app')

@section('content')
    @foreach ($posts as $post)
        @include('posts.partials.post', [
            'class' => 'mb-10',
            'blog' => true
        ])
    @endforeach
@endsection