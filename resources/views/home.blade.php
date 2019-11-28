@extends('layouts.app')

@section('content')
    <h1 class="max-w-lg text-3xl md:text-4xl font-slab text-gray-700 font-extrabold leading-tight mb-1">Hi, I'm Faysal</h1>
    <p class="leading-relaxed text-lg text-gray-700">I'm a full-stack web developer who loves working with PHP, JavaScript, Laravel, Vue and WordPress. </p>

    @if($featured_posts->count() > 0)
    <div class="mt-10">
        <div class="mb-2 p-2 bg-gray-700 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span class="font-semibold px-5 flex-auto">Featured Blog Posts</span>
        </div>
        @foreach ($featured_posts as $post)
            @include('posts.partials.post', [
                'class' => 'mb-10',
                'blog' => true
            ])
        @endforeach
    </div>
    @endif
@endsection