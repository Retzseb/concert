<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    /** @use HasFactory<\Database\Factories\ConcertFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'performer_id', 
        'room_id',
        'date',
        'base_price',
        'description',
        'status'
    ];          
}
