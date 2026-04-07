<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConcertRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'picture' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'name' => ['sometimes', 'string', 'max:50'],
            'performer_id' => ['sometimes', 'integer', 'exists:performers,id'],
            'room_id' => ['sometimes', 'integer', 'exists:rooms,id'],
            'date' => ['sometimes', 'date'],
            'base_price' => ['sometimes', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', 'integer', 'in:0,1,2'],
            'soft_delete' => ['sometimes', 'boolean'],
        ];
    }
}
