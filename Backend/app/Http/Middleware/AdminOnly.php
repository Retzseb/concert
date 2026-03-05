<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminOnly
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if ((int)$user->role !== 0) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return $next($request);
    }
}