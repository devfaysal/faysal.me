<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/tailwind.css') }}" rel="stylesheet">
</head>
<body class="bg-gray-200 leading-tight">
    <div class="max-w-2xl mx-auto px-6">
        <header class="flex justify-center py-6">
            <div class="sm:flex sm:items-center">
                <a href="/" class="block mb-4 sm:mb-0">
                    <img class="w-24 h-24 mx-auto bg-grey-dark rounded-full shadow sm:flex hover:shadow-md" src="https://avatars3.githubusercontent.com/u/16212149">
                </a>
                <div class="sm:ml-6">
                    <a href="/" class="no-underline text-gray-700">
                        <h1 class="font-bold text-4xl mb-1 text-center sm:text-left">Faysal Ahamed</h1>
                    </a>
                    <p class="text-gray-600 text-sm mb-3 text-center sm:text-left">Full Stack Web Developer.</p>
                    <div class="flex justify-center text-center md:justify-start">
                        <a href="https://twitter.com/skollro" class="mr-2 no-underline text-gray-700 hover:text-grey-darkest">
                            <i data-feather="twitter"></i>
                        </a>
                        <a href="https://github.com/skollro" class="mr-2 no-underline text-gray-700 hover:text-grey-darkest">
                            <i data-feather="github"></i>
                        </a>
                        <a href="https://www.facebook.com/simonkollross" class="mr-2 no-underline text-gray-700 hover:text-grey-darkest">
                            <i data-feather="facebook"></i>
                        </a>
                        <a href="https://simonkollross.de/feed" class="mr-2 no-underline text-gray-700 hover:text-grey-darkest">
                            <i data-feather="rss"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <nav class="flex justify-around flex-wrap border-t border-b mb-8">
            <a href="https://simonkollross.de" class="m-2 inline-block text-gray-700 uppercase tracking-wide no-underline hover:underline hover:text-gray-600">Blog</a>
            <a href="https://simonkollross.de/projects" class="m-2 inline-block text-gray-700 uppercase tracking-wide no-underline hover:underline hover:text-gray-600">Projects</a>
            <a href="https://simonkollross.de/about" class="m-2 inline-block text-gray-700 uppercase tracking-wide no-underline hover:underline hover:text-gray-600">About</a>
        </nav>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
