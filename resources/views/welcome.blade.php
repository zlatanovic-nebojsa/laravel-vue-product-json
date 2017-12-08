<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Test</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">

    </head>
    <body>
        <div id="app" class="container">
            <products></products>
        </div>

        <script type="text/javascript" src="{{ URL::asset('js/app.js') }}"></script>

        <script>

        </script>
    </body>
</html>
