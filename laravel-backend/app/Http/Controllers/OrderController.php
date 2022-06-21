<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        $orders = Order::paginate();

        return OrderResource::collection($orders);
    }

    public function show($id) {
        return new OrderResource(Order::find($id));
    }

    // Export to CSV
    public function export() {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=orders.csv',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () {
            $orders = Order::all();

            $file = fopen('php://output', 'w');

            // Header row
            fputcsv($file, ['ID', 'Name', 'Email', 'Product Name', 'Price', 'Quantity']);

            // Body
            foreach ($orders as $order) {
                fputcsv($file, [$order->id, $order->name, $order->email, '', '', '']);

                foreach ($order->orderItems as $item) {
                    fputcsv($file, ['', '', '', $item->product_name, $item->price, $item->quantity]);
                }
            }

            fclose($file);
        };

        $status = 200;

        return response()->stream($callback, $status, $headers);
    }
}
