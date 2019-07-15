<article class="{{ $class }}">
    @include('posts.partials.header')

    @isset($blog)
        <div class="excerpt text-lg text-gray-800 leading-relaxed">
            {{$post->excerpt}}
        </div>
        <p class="mt-3"><a class="underline text-blue-600" href="{{ $post->path() }}">Read more</a></p>
    @else 
        @if(Storage::disk('public')->exists($post->image))
            <div class="mb-2">
                <img src="{{asset('storage/' . $post->image)}}" alt="{{$post->title}}">
            </div>
        @endif
        <div class="markdown text-lg text-gray-800 leading-relaxed">
            {!! $post->processed_content !!}
        </div>
    @endisset
</article>

