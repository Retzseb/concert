<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDiscountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $discountId = $this->route('discount')?->id ?? $this->route('discount');

        return [
            'type' => ['sometimes', 'string', 'max:50', Rule::unique('discounts', 'type')->ignore($discountId)],
            'value' => ['sometimes', 'integer', 'min:0', 'max:100'],
        ];
    }
}
