<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Closure;


class Custom extends Middleware
{
    protected $except = ['/read'];

    public function handle($request, Closure $next, ...$guards)
    {

        echo '<pre>';
        var_dump('custom middleware');

        // var_dump($request->server);
        // var_dump($request->query);
        // var_dump($request->files);
        // var_dump($request->cookie);
        // var_dump($request->headers);
        var_dump(get_class_methods($request));
        var_dump($request->all());
        var_dump($request->input());
        var_dump($request->all());
        foreach ($request as $key => $value) {
            var_dump($key);
        }
        exit;
        return $next($req);
    }
}