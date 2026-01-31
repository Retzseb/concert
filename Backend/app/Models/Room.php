<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;
    protected $fillable = [
        'place_id',
        'name',
        'total_rows', 
        'total_columns'
    ];        

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
