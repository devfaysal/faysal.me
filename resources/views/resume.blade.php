@extends('layouts.app')

@section('content')
    <h1 class="max-w-lg text-3xl md:text-4xl text-gray-700 font-extrabold leading-tight mb-1">Faysal Ahamed</h1>
    <p class="text-gray-600 mb-3 text-center sm:text-left">Full-stack Web Developer</p>
    <div>
        <p class="flex text-gray-600">
            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill="currentColor" d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
            </svg>
            <span class="inline-block pl-2">Dhaka Cantonment, Dhaka 1206, Bangladesh</span>
        </p>
    </div>
    <div class="py-5">
        <h2>Profile</h2>
        <p class="text-gray-700">
            I love working with PHP and JavaScript, with a particular affection for the Laravel and Vue frameworks respectively. I often use WordPress CMS for general purpose websites.
        </p>
    </div>

    <div>
        <h2>Employment History</h2>
        <div class="py-2">
            <p>Web Developer</p>
            <a href="https://webpers.com/">Webpers</a>
            <p>May 2016 to October 2017</p>
        </div>
        <div class="py-2">
            <p>Web Developer</p>
            <a href="http://surovigroup.com/">Surovi Group</a>
            <p>October 2017 Present</p>
        </div>
    </div>
@endsection