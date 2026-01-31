<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->tinyInteger('role')->default(2); //0: admin, 1: cashier, 2: user
            $table->rememberToken();
            $table->timestamps();
        });

        User::create([
            'name' => 'Bíró Eszter',
            'email' => 'biroeszter@gexample.com',
            'password' => 'biroadmin*/%',
            'role' => '0'
        ]);

        User::create([
            'name' => 'Szépréthy Regina',
            'email' => 'szeprethyregina@example.com',
            'password' => 'szeprethyadmin*/%',
            'role' => '0'
        ]);      
        
        User::create([
            'name' => 'Kasszás Piros',
            'email' => 'kasszaspiros@example.com',
            'password' => 'kasszas1*/%',
            'role' => '1'
        ]);       
        
        User::create([
            'name' => 'Pénz Elek',
            'email' => 'penzelek@example.com',
            'password' => 'kasszas2*/%',
            'role' => '1'
        ]);      
        
        User::create([
            'name' => 'Első Elek',
            'email' => 'elsoelek@example.com',
            'password' => 'elsoelek123',
            'role' => '2'
        ]);      
        
        User::create([
            'name' => 'Második Mária',
            'email' => 'masodikmaria@example.com',
            'password' => 'masodikmaria123',
            'role' => '2'
        ]);      
        
        User::create([
            'name' => 'Harmadik Hedvig',
            'email' => 'harmadikhedvig@example.com',
            'password' => 'harmadikhedvig123',
            'role' => '2'
        ]);           

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
