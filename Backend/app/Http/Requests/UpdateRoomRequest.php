<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'place_id' => ['sometimes', 'integer', 'exists:places,id'],
            'serial_number' => ['sometimes', 'integer', 'min:1'],
            'total_rows' => ['sometimes', 'integer', 'min:1'],
            'total_columns' => ['sometimes', 'integer', 'min:1'],
        ];
    }
}
