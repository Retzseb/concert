<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'place_id' => ['required', 'integer', 'exists:places,id'],
            'serial_number' => ['required', 'integer', 'min:1'],
            'total_rows' => ['required', 'integer', 'min:1'],
            'total_columns' => ['required', 'integer', 'min:1'],
        ];
    }
}
