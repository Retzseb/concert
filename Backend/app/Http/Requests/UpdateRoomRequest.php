<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'place_id' => ['sometimes', 'integer', 'exists:places,id'],
            'name' => ['sometimes', 'integer'],
            'total_rows' => ['sometimes', 'integer', 'min:1'],
            'total_columns' => ['sometimes', 'integer', 'min:1'],
        ];
    }
}
