<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSeatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_id' => ['required', 'integer', 'exists:rooms,id'],
            'row_number' => ['required', 'integer', 'min:1'],
            'column_number' => ['required', 'integer', 'min:1'],
            'price_multiplier' => ['nullable', 'numeric', 'gt:0'],
        ];
    }
}
