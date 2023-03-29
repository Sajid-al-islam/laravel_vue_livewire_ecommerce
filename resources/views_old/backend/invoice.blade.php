<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <title>Invoice of order</title>
    <style>
        @media print {
            #print_section {
                position: fixed;
                width: 100vw;
                top: 0;
                left: 0;
                margin: 0;
                padding: 0;
                z-index: 9999;
                box-shadow: none;
                padding: 20px;
                margin-top: 40px;
            }
            .container {
                margin: 0px !important;
                padding: 0px !important;
            }
            
        }
    </style>
  </head>
  <body>
    <div class="container h-100">
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <button class="btn btn-sm btn-outline-success mb-2" onclick="window.print()">print</button>
                <div class="card" id="print_section">
                    <div class="card-header p-4">
                        <a class="pt-2 d-inline-block" href="index.html" data-abc="true">Ctgcomputer.com</a>
                        <div class="float-right">
                            <h3 class="mb-0">Invoice no: #{{ $order_details->invoice_id }}</h3>
                            Date: {{ $order_details->invoice_date }} 
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-sm-6">
                                <h5 class="mb-3">From:</h5>
                                <h3 class="text-dark mb-1">Ctgcomputer</h3>
                                <div>Computer City Centre (Multiplan), Level: 4,</div>
                                <div>Shop: 407-409, 69-71 New Elephant Road, Dhaka</div>
                                <div>Email: ctgcomputercentre2008@gmail.com</div>
                                <div>Phone: 01733-080350</div>
                            </div>
                            <div class="col-sm-6">
                                <h5 class="mb-3">To:</h5>
                                <h3 class="text-dark mb-1">{{ $order_details->order_address->first_name }} {{ $order_details->order_address->last_name }}</h3>
                                <div>{{ $order_details->order_address->address }}</div>
                                <div>Email: {{ $order_details->order_address->email }}</div>
                                <div>Phone: {{ $order_details->order_address->mobile_number }}</div>
                            </div>
                        </div>
                        <div class="table-responsive-sm">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="center">#</th>
                                        <th>Item</th>
                                        <th class="right">Price</th>
                                        <th class="center">Qty</th>
                                        <th class="right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($order_details->order_details as $key => $order)
                                    <tr>
                                        <td class="center">{{ $key+1 }}</td>
                                        <td class="left strong">{{ $order->product->product_name }}</td>
                                        <td class="right">{{ $order->product_price }}</td>
                                        <td class="center">{{ $order->qty }}</td>
                                        <td class="right">{{ $order->product_price * $order->qty }}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-lg-9 col-md-9 col-sm-9"></div>
                            <div class="col-lg-3 col-md-3 col-sm-3 ml-auto">
                                <table class="table table-clear">
                                    <tbody>
                                        <tr>
                                            <td class="left">
                                                <strong class="text-dark">Subtotal</strong>
                                            </td>
                                            <td class="right">{{ $order_details->sub_total }}</td>
                                        </tr>
                                        <tr>
                                            <td class="left">
                                                <strong class="text-dark">Total</strong>
                                            </td>
                                            <td class="right">
                                                <strong class="text-dark">{{ $order_details->total_price }}</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

  </body>
</html>