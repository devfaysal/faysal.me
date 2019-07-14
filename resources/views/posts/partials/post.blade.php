<article class="{{ $class }}">
    @include('posts.partials.header')

    @isset($blog)
        <div class="excerpt text-lg text-gray-900 leading-relaxed">
            {{$post->excerpt}}
        </div>
    @else 
        <div class="markdown text-lg text-gray-900 leading-relaxed">
            {!! $post->processed_content !!}
        </div>
    @endisset
</article>

