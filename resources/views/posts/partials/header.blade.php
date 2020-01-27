<header class="mb-2">
    <h1 class="pt-1 pb-2 text-2xl md:text-3xl font-slab font-semibold text-gray-700">
        @isset($blog)
            <a href="{{$post->path()}}">{{$post->title}}</a>
        @else
            {{$post->title}}
        @endisset
    </h1>

    <p class="text-sm text-gray-700 leading-loose">
        <time datetime="{{ optional($post->published_at)->format(DateTime::ATOM) }}">
            {{ optional($post->published_at)->format('jS M Y') }}
        </time>

        by {{$post->author}}

        &middot; {{ $post->reading_time }}

        @if(!$post->tags->isEmpty())
            &middot;
        @endif
        @foreach($post->tags as $tag)
            <a href="" class="bg-gray-400 hover:bg-gray-500 p-1 rounded">#{{ $tag->name }}</a>
        @endforeach
    </p>
</header>