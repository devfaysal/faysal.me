<meta name="description" content="{{$post->excerpt}}">
<meta property="og:url" content="{{URL::to($post->path())}}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="{{$post->title}}" />
<meta property="og:description" content="{{$post->excerpt}}" />
<meta property="og:image" content="{{asset('public/'.$post->image)}}" />