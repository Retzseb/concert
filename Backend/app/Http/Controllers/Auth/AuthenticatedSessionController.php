<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response
    {
        // $request->authenticate();

        // $request->session()->regenerate();

        // return response()->noContent();

        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        /* $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken; */

        /* return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
            'status' => 'Login successful',
        ]); */
        return response()->noContent();
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard("web")->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
        /* $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout successful']); */
    }
}
