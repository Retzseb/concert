<?php

namespace Database\Seeders;

use App\Models\Discount;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    public function run(): void
    {
        $discounts = [
            ['type' => 'normál', 'value' => 100],
            ['type' => 'diák', 'value' => 50],
            ['type' => 'nyugdíjas', 'value' => 45],
            ['type' => 'vip', 'value' => 25],
            ['type' => 'promo', 'value' => 10],
        ];

        foreach ($discounts as $discount) {
            Discount::query()->firstOrCreate(['type' => $discount['type']], $discount);
        }
    }
}
