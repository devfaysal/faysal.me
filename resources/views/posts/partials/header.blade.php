<header class="mb-2">
    <h1 class="pt-1 pb-2 text-2xl md:text-3xl font-slab font-semibold text-gray-700">
        @isset($blog)
            <a href="{{ route('posts.show', $post->slug()) }}">{{$post->title}}</a>
        @else
            {{$post->title}}
        @endisset
    </h1>

    <p class="text-sm text-gray-700 leading-loose">
        <time datetime="{{ $post->date()->format(DateTime::ATOM) }}">
            {{ $post->date()->format('jS M Y') }}
        </time>

        by Faysal Ahamed

        @if($post->tags && count($post->tags) > 0)
            &middot;
            @foreach($post->tags as $tag)
                <a href="" class="bg-gray-300 hover:bg-gray-200 p-1 rounded">#{{ $tag->title }}</a>
            @endforeach
        @endif
    </p>
</header>