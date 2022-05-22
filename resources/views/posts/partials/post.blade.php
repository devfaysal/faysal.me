<article class="{{ $class }}">
    @include('posts.partials.header')

    @isset($blog)
        <div class="excerpt text-lg text-gray-800 leading-relaxed">
            {{$post->excerpt}}
        </div>
        <p class="mt-3"><a class="underline text-blue-600" href="{{ route('posts.show', $post->slug()) }}">Read more</a></p>
    @else 
        @if(Storage::disk('public')->exists($post->image))
            <div class="mb-2">
                <img src="{{asset('storage/' . $post->image)}}" alt="{{$post->title}}">
                @isset($post->image_credit)
                    <p class="text-right text-gray-600 text-xs markup pt-2">{!! $post->image_credit !!}</p>
                @endisset
            </div>
        @endif
        <div class="content text-lg text-gray-800 leading-relaxed">
            {!! Statamic::modify($post->content)->markdown() !!}
        </div>
    @endisset
</article>

