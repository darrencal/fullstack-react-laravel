<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create 30 orders and randomly create between 1 and 5 items for each order
        Order::factory()
            ->count(30)
            ->create()
            ->each(function (Order $order) {
                OrderItem::factory()
                    ->count(random_int(1, 5))
                    ->create([
                        'order_id' => $order->id
                    ]);
            });
    }
}
