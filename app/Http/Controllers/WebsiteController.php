<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;


class WebsiteController extends Controller
{
    public function website()
    {

        echo "website";
    }

    public function invoice_download($invoice)
    {
        $order_details = Order::where('invoice_id', $invoice)->with(['order_address', 'order_payments','order_details' => function($q) {
            $q->with('product');
        }])->first();

        return view('backend.invoice', compact('order_details', $order_details));
    }
}
