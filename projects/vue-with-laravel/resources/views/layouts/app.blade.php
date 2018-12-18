<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{asset('css/app.css')}}"/>
        <title>{{config('app.name', 'User Manager')}}</title>
        <meta name='csrf-token' content="{{csrf_token()}}">
        <script>window.Laravel= {csrfToken:'{{csrf_token()}}'}</script>
   </head>
    <body>
        <div id="app" >
        
        <div class="container">
            <app></app>
            @yield('content')
        </div>
    </div>

        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
