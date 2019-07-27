<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @isset($title)
        <title>{{ $title }} - Faysal Ahamed</title>
    @else
        <title>Faysal Ahamed</title>
    @endisset

    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400|Merriweather:400,400i,700,700i|Zilla+Slab:300,300i,400,400i&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ mix('css/tailwind.css') }}" rel="stylesheet">
    @isset($post)
        @include('posts.partials.socialSeo')
    @else
        <meta name='description' content="Faysal Ahamed is a full-stack web developer who loves working with PHP, JavaScript, Laravel, Vue and WordPress. ">
        <meta property='og:site_name' content="Faysal Ahamed">
        <meta property='og:locale' content="en_US">
        <meta property='og:description' content="Faysal Ahamed is a full-stack web developer who loves working with PHP, JavaScript, Laravel, Vue and WordPress.">
        <meta property='og:url' content="{{ request()->fullUrl() }}">
    @endisset

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-144706059-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-144706059-1');
    </script>
    
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
                        <h1 class="font-bold text-4xl mb-1 font-slab text-center sm:text-left">Faysal Ahamed</h1>
                    </a>
                    <p class="text-gray-600 mb-3 text-center sm:text-left">Full-stack Web Developer</p>
                    <div class="flex justify-center text-center md:justify-start">
                        <a target="_blank" href="https://github.com/devfaysal" class="text-gray-500 hover:text-github m-2 md:ml-0 no-underline">
                            <svg aria-hidden="true" alt="GitHub" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="w-6">
                                <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                            </svg>
                        </a>
                        <a target="_blank" href="https://twitter.com/devfaysal" class="text-gray-500 hover:text-twitter m-2 no-underline">
                            <svg aria-hidden="true" alt="Twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6">
                                <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                            </svg>
                        </a>
                        <a target="_blank" href="https://facebook.com/devfaysal" class="text-gray-500 hover:text-facebook m-2 no-underline">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-6 h-6 fill-current">
                                <path d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"></path>
                            </svg>
                        </a>
                        <a target="_blank" href="mailto:hello@faysal.me" class="text-gray-500 hover:text-gray-600 m-2 no-underline">
                            <svg aria-hidden="true" alt="E-mail" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6">
                                <path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" class=""></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <nav class="flex justify-around flex-wrap border-gray-400 border-t border-b mb-8">
            <a href="/" class="m-2 inline-block text-gray-700 text-sm tracking-wider uppercase tracking-wide no-underline hover:underline hover:text-gray-600">Home</a>
            <a href="/about" class="m-2 inline-block text-gray-700 text-sm tracking-wider uppercase tracking-wide no-underline hover:underline hover:text-gray-600">About</a>
            <a href="/blog" class="m-2 inline-block text-gray-700 text-sm tracking-wider uppercase tracking-wide no-underline hover:underline hover:text-gray-600">Blog</a>
        </nav>
        <main>
            @yield('content')
        </main>
        <footer class="flex justify-between pt-4 pb-8">
            {{-- <a href="/privacy-policy" class="text-sm text-gray-500 no-underline hover:underline">Privacy Policy</a> --}}
            <span class="text-sm text-gray-500">© {{date('Y')}} Faysal Ahamed</span>
        </footer>
    </div>
    <script src="{{ mix('js/app.js') }}" defer></script>
</body>
</html>
