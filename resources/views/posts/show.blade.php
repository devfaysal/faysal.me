@extends('layouts.app')

@section('content')
    <div>
        <h1 class="py-2 text-2xl text-gray-700">{{$post->title}}</h1>

        @include('posts.meta')

        <div class="markdown">
            {!! $post->processed_content() !!}
        </div>
    </div>
@endsection