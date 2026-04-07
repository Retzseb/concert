<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return User::query()->orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'email' => ['required','email','max:255', Rule::unique('users','email')],
            'password' => ['required','string','min:8','max:255'],
            'role' => ['nullable','integer','in:0,2'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'] ?? 2,
        ]);

        return response()->json($user, 201);
    }

    public function show(string $id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => ['sometimes','string','max:255'],
            'email' => ['sometimes','email','max:255', Rule::unique('users','email')->ignore($user->id)],
            'role' => ['sometimes','integer','in:0,2'],
        ]);

        $user->fill($data);
        $user->save();

        return response()->json($user, 200);
    }

    public function updateRole(Request $request, string $id)
    {
        $data = $request->validate([
            'role' => ['required','integer','in:0,2'],
        ]);

        $user = User::findOrFail($id);
        $user->role = $data['role'];
        $user->save();

        return response()->json($user, 200);
    }

    public function updatePassword(Request $request, string $id)
    {
        $data = $request->validate([
            'password' => ['required','string','min:8','max:255'],
        ]);

        $user = User::findOrFail($id);
        $user->password = Hash::make($data['password']);
        $user->save();

        return response()->json(['message' => 'Password updated.'], 200);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }

        public function updateMe(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['sometimes', 'string', 'min:8', 'max:255', 'confirmed'],
            'current_password' => ['required_with:password', 'string'],
        ]);

        if (array_key_exists('password', $data)) {
            if (!Hash::check($data['current_password'], $user->password)) {
                return response()->json([
                    'message' => 'The given data was invalid.',
                    'errors' => [
                        'current_password' => ['Current password is incorrect.'],
                    ],
                ], 422);
            }
            $user->password = Hash::make($data['password']);
        }

        $user->fill(collect($data)->only(['name', 'email'])->toArray());
        $user->save();

        return response()->json($user, 200);
    }

}
