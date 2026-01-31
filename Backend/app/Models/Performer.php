<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Performer extends Model
{
    /** @use HasFactory<\Database\Factories\PerformerFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'genre',
        'description',
        'country'
    ];    
}
