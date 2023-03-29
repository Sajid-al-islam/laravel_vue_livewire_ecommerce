<?php

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use App\Models\ProductStock;
use App\Models\ProductStockLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ProductStockController extends Controller
{
    public function all()
    {
        $paginate = (int) request()->paginate;
        $orderBy = request()->orderBy;
        $orderByType = request()->orderByType;

        $status = 1;
        if (request()->has('status')) {
            $status = request()->status;
        }

        $query = ProductStock::where('status', $status)->orderBy($orderBy, $orderByType);

        if (request()->has('search_key')) {
            $key = request()->search_key;
            $query->where(function ($q) use ($key) {
                return $q->where('id', $key)
                    ->orWhere('product_id', $key)
                    ->orWhere('supplier_id', $key);
            });
        }

        $users = $query->with(['product', 'supplier'])->paginate($paginate);
        return response()->json($users);
    }

    public function show($id)
    {
        $data = ProductStock::where('id',$id)->with(['product', 'supplier'])->first();
        if(!$data){
            return response()->json([
                'err_message' => 'not found',
                'errors' => ['role'=>['data not found']],
            ], 422);
        }
        return response()->json($data,200);
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'selected_product' => ['required'],
            'selected_supplier' => ['required'],
            'qty' => ['required', 'numeric'],
            'purchase_date' => ['required', 'date']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        /* 
            First insert the qty data in product stock table
        */
        $data = new ProductStock();
        $data->supplier_id = request()->selected_supplier[0];
        $data->product_id = request()->selected_product[0]; 
        $data->qty = request()->qty; 
        $data->purchase_date = Carbon::parse(request()->purchase_date)->toDateString();
        
        $data->save();

        /* 
            Insert the data in stock log table,
            type="sales" || insert when a product is ordered
            type="purchase" || inserted when a 
        */

        $dataStock = new ProductStockLog();
        $dataStock->product_id = $data->product_id;
        $dataStock->qty = $data->qty; 
        $dataStock->type = "purchase"; 
        $dataStock->creator = Auth::user()->id; 
        $dataStock->save();

        return response()->json($data, 200);
    }

   

    public function canvas_store()
    {
        
    }

    public function update()
    {

        $validator = Validator::make(request()->all(), [
            'selected_product' => ['required'],
            'selected_supplier' => ['required'],
            'qty' => ['required'],
            'purchase_date' => ['required', 'date']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        $stock_quantity = ProductStock::find(request()->id);
        if(request()->qty < -$stock_quantity->qty || request()->qty > 0) {
            
            return response()->json([
                'err_message' => 'Stock quantity cannot be less then the original stock',
                'err_type' => 'quantity_invalid'
            ], 400);
            
        }else {
            return 0;
            /* 
            First insert the qty data in product stock table
            */
            $data = new ProductStock();
            $data->supplier_id = request()->selected_supplier[0];
            $data->product_id = request()->selected_product[0]; 
            $data->qty = request()->qty; 
            $data->purchase_date = Carbon::parse(request()->purchase_date)->toDateString();
            
            $data->save();

            /* 
                Insert the data in stock log table,
                type="sales" || insert when a product is ordered
                type="purchase" || inserted when a 
            */

            $dataStock = new ProductStockLog();
            $dataStock->product_id = $data->product_id;
            $dataStock->qty = $data->qty; 
            $dataStock->type = "purchase"; 
            $dataStock->creator = Auth::user()->id; 
            $dataStock->save();

            return response()->json($data, 200);
        }
        
    }

    public function canvas_update()
    {
        $data = ProductStock::find(request()->id);
        if(!$data){
            return response()->json([
                'err_message' => 'validation error',
                'errors' => ['name'=>['user_role not found by given id '.(request()->id?request()->id:'null')]],
            ], 422);
        }

        $validator = Validator::make(request()->all(), [
            'full_name' => ['required'],
            'email' => ['required'],
            'subject' => ['required'],
            'message' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data->full_name = request()->full_name;
        $data->email = request()->email;
        $data->subject = request()->subject;
        $data->message = request()->message;
        $data->save();

        return response()->json($data, 200);
    }

    public function soft_delete()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required','exists:products,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = ProductStock::find(request()->id);
        $data->status = 0;
        $data->save();

        return response()->json([
                'result' => 'deactivated',
        ], 200);
    }

    public function destroy()
    {
    }

    public function restore()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required','exists:products,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = ProductStock::find(request()->id);
        $data->status = 1;
        $data->save();

        return response()->json([
                'result' => 'activated',
        ], 200);
    }

    public function bulk_import()
    {
        $validator = Validator::make(request()->all(), [
            'data' => ['required','array'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        foreach (request()->data as $item) {
            $item['created_at'] = $item['created_at'] ? Carbon::parse($item['created_at']): Carbon::now()->toDateTimeString();
            $item['updated_at'] = $item['updated_at'] ? Carbon::parse($item['updated_at']): Carbon::now()->toDateTimeString();
            $item = (object) $item;
            $check = ProductStock::where('id',$item->id)->first();
            if(!$check){
                try {
                    ProductStock::create((array) $item);
                } catch (\Throwable $th) {
                    return response()->json([
                        'err_message' => 'validation error',
                        'errors' => $th->getMessage(),
                    ], 400);
                }
            }
        }

        return response()->json('success', 200);
    }
}
