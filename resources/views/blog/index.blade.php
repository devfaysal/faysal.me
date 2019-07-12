@extends('layouts.app')

@section('content')
    <div>
        @foreach ($posts as $post)
            <div class="py-4">
                <a href="/{{$post->slug}}">
                    <h1 class="py-1 text-2xl text-gray-700">{{$post->title}}</h1>
                </a>
                <div>
                    {{$post->excerpt}}
                </div>
            </div>
        @endforeach
    </div>
@endsection