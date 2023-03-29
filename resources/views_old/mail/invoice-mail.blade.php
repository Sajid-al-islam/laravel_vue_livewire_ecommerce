@component('mail::message')
# Hello, {{ $order_details->order_address->first_name }} {{ $order_details->order_address->last_name }}


your invoice id is: {{ $order_details->invoice_id }}


@component('mail::table')
<div class="row" style="display: flex;">
    <div class="column" style="flex: 50%; padding: 5px;">
        <h5 class="mb-3">From:</h5>
        <h3 class="text-dark mb-1">Ctg Computer ltd</h3>
        <p>Computer City Centre (Multiplan), Level: 4, Shop: 407-409</p>
        <p>69-71 New Elephant Road, Dhaka, Bangladesh</p>
        <p>Email: ctgcomputercentre2008@gmail.com</p>
        <p>Phone: 01733-080350</p>
    </div>
    <div class="column" style="flex: 50%; padding: 5px;">
        <h5 class="mb-3">To:</h5>
        <h3 class="text-dark mb-1">{{ $order_details->order_address->first_name }} {{ $order_details->order_address->last_name }}</h3>
        <div>{{ $order_details->order_address->address }}</div>
        <div>Email: {{ $order_details->order_address->email }}</div>
        <div>Phone: {{ $order_details->order_address->mobile_number }}</div>
    </div>
</div>
@endcomponent

@component('mail::table')
@foreach ($order_details->order_details as $key => $order)
@php
    $product_total = $order->product_price * $order->qty;
@endphp
| Item          | Price         | Qty      | Total      |
| ------------- |:-------------:| :-------:|:----------:|
| {{ $key+1 }}  | {{ $order->product->product_name }}  | {{ $order->qty }}  | {{ $product_total }} |
@endforeach
@endcomponent

@component('mail::button', ['url' => route('invoice', $order_details->invoice_id)])
Download Invoice
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
