@extends('layouts.app')

@section('content')
    <div class="markdown">
        {!! $post->processed_content() !!}
    </div>
@endsection