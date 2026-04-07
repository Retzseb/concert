<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Bíró Eszter', 'email' => 'biroeszter@gexample.com', 'password' => 'Biroadmin123', 'role' => 0],
            ['name' => 'Szépréthy Regina', 'email' => 'szeprethyregina@example.com', 'password' => 'Szeprethy123', 'role' => 0],
            ['name' => 'Kasszás Piros', 'email' => 'kasszaspiros@example.com', 'password' => 'Kasszas123', 'role' => 2],
            ['name' => 'Pénz Elek', 'email' => 'penzelek@example.com', 'password' => 'Penzelek123', 'role' => 2],
            ['name' => 'Első Elek', 'email' => 'elsoelek@example.com', 'password' => 'Elsoelek123', 'role' => 2],
            ['name' => 'Második Mária', 'email' => 'masodikmaria@example.com', 'password' => 'Masodik123', 'role' => 2],
            ['name' => 'Harmadik Hedvig', 'email' => 'harmadikhedvig@example.com', 'password' => 'Harmadik123', 'role' => 2],
        ];

        foreach ($users as $user) {
            User::query()->firstOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => Hash::make($user['password']),
                    'role' => $user['role'],
                ]
            );
        }
    }
}
