<meta name="description" content="{{$post->excerpt}}">
@foreach($post->tags as $tag)
    <meta property="article:tag" content="{{ $tag->name }}"/>
@endforeach
<meta property="article:published_time" content="{{ optional($post->published_at)->toIso8601String() }}"/>
<meta property="og:updated_time" content="{{ $post->updated_at->toIso8601String() }}"/>

<meta property="og:url" content="{{URL::to($post->path())}}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="{{$post->title}} | Faysal Ahamed" />
<meta property="og:description" content="{{$post->excerpt}}" />
<meta property="og:image" content="{{$post->image ? asset('storage/'.$post->image) : route('socialCardImage', $post->slug)}}" />
<meta property="og:image:width" content="1000" />
<meta property="og:image:height" content="500" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:description" content="{{$post->excerpt}}" />
<meta name="twitter:title" content="{{$post->title}} | Faysal Ahamed" />
<meta name="twitter:site" content="@devfaysal" />
<meta name="twitter:image" content="{{$post->image ? asset('storage/'.$post->image) : route('socialCardImage', $post->slug)}}" />
<meta name="twitter:creator" content="@devfaysal" />