<?php

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductStock;
use App\Models\ProductStockLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image as interImage;
use Throwable;

class ProductController extends Controller
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

        $query = Product::where('status', $status)->orderBy($orderBy, $orderByType);

        if (request()->has('search_key')) {
            $key = request()->search_key;
            $query->where(function ($q) use ($key) {
                return $q->where('id', $key)
                    ->orWhere('product_name', $key)
                    ->orWhere('default_price', $key)
                    ->orWhere('product_name', 'LIKE', '%' . $key . '%')
                    ->orWhere('default_price', 'LIKE', '%' . $key . '%');
            });
        }
        $query->withSum('stocks','qty');
        $query->withSum('sales','qty');
        $users = $query->paginate($paginate);
        return response()->json($users);
    }

    public function show($id)
    {
        $data = Product::where('id',$id)->with(['categories'])->first();
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
            'product_name' => ['required'],
            'default_price' => ['required'],
            // 'brand_id' => ['required'],
            'selected_categories' => ['required'],
            'specification' => ['required'],
            'description' => ['required'],
            'search_keywords' => ['required'],
            'page_title' => ['required'],
            // 'product_url' => ['required', 'unique:products'],
            'meta_description' => ['required'],
            'track_inventory_on_the_variant_level_stock' => ['required'],
            'track_inventory_on_the_variant_level_low_stock' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $product_info = request()->except([
            'selected_categories',
            'image'
        ]);

        $product_info['selected_categories'] = json_encode(request()->selected_categories);
        // $product_info['custom_fields'] = $request->custom_fields;
        // $product_info['hs_codes'] = $request->hs_codes;

        $related_iamges_id = [];
        if (request()->hasFile('image')) {
            foreach (request()->file('image') as $key => $image) {

                try {
                    $path = $this->store_product_file($image);
                    $id = ProductImage::insertGetId([
                        // 'product_id' => $product->id,
                        'product_id' => 0,
                        'image' => $path,
                        'creator' => Auth::user()->id,
                        'created_at' => Carbon::now()->toDateTimeString(),
                    ]);
                    array_push($related_iamges_id, $id);
                } catch (Throwable $e) {
                    dump($e);
                    // report($e);
                    return response()->json($e, 500);
                }
            }
        }
        // dd($related_iamges_id);

        if (count($related_iamges_id) > 0) {
            $product = Product::create($product_info);
            // dd(request()->selected_categories, $product);
            $product->categories()->attach(request()->selected_categories);

            $this->product_stock_set(null, $product->id, $product->created_at, $product->track_inventory_on_the_variant_level_stock);
            $this->product_stock_log_set($product->id, $product->track_inventory_on_the_variant_level_stock, 'initial');

            for ($i = 0; $i < count($related_iamges_id); $i++) {
                $related_iamge = ProductImage::find($related_iamges_id[$i]);
                $related_iamge->product_id = $product->id;
                $related_iamge->save();
            }

            $message = "product created!";
            return response()->json([
                'message' => $message
            ], 200);
        } else {
            return response()->json('Upload valid jpg or jpeg image.', 500);
        }

    }

    public function product_stock_set($supplier_id = null, $product_id, $purchase_date, $qty)
    {
        ProductStock::create([
            'supplier_id' => $supplier_id,
            'product_id' => $product_id,
            'purchase_date' => $purchase_date,
            'qty' => $qty,
        ]);
    }

    public function product_stock_log_set($product_id, $qty, $type)
    {
        ProductStockLog::create([
            'product_id' => $product_id,
            'qty' => $qty,
            'type' => $type,
            'creator' => auth()->user()->id,
        ]);
    }

    public function store_product_file($image)
    {
        // $path = Storage::put('uploads/file_manager',$request->file('fm_file'));
        $file = $image;
        $extension = $file->getClientOriginalExtension();
        $temp_name  = uniqid(10) . time();
        $image = interImage::make($file);

        // main image
        // $path = 'uploads/product/product_' . $temp_name . '.' . $extension;
        // $image->save($path);
        // $this->image_save_to_db($path);

        // rectangle
        // $image->fit(848, 438, function ($constraint) {
        //     $constraint->aspectRatio();
        // });
        // $path = 'uploads/file_manager/fm_image_848x438_' . $temp_name . '.' . $extension;
        // $image->save($path);
        // $this->image_save_to_db($path);

        // square
        $canvas = interImage::canvas(400, 400);
        $image->fit(400, 400, function ($constraint) {
            $constraint->aspectRatio();
        });
        $canvas->insert($image);
        // $canvas->insert(interImage::make(public_path('ilogo.png')), 'bottom-right');

        $path = 'uploads/product/product_image_400x400_' . $temp_name . '.' . $extension;
        $canvas->save($path);

        return $path;
    }

    public function canvas_store()
    {
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

        $data = new ContactMessage();
        $data->full_name = request()->full_name;
        $data->email = request()->email;
        $data->subject = request()->subject;
        $data->message = request()->message;
        $data->save();

        return response()->json($data, 200);
    }

    public function update()
    {
        $product_info = request()->except([
            'selected_categories',
            'image'
        ]);
        $product_info['selected_categories'] = json_encode(request()->selected_categories);

        $product = Product::find(request()->id);
        $product->fill($product_info);

        if (request()->hasFile('image')) {
            // dd($request->file('upload_image'));
            //
            foreach ($product->related_image()->get() as $single_imge) {
                // dump(public_path($single_imge->image), $single_imge);
                if (file_exists(public_path($single_imge->image))) {
                    unlink(public_path($single_imge->image));
                }
            }
            ProductImage::where('product_id', $product->id)->delete();
            foreach (request()->file('image') as $key => $image) {

                try {
                    $path = $this->store_product_file($image);
                    ProductImage::insert([
                        'product_id' => $product->id,
                        'image' => $path,
                        'creator' => Auth::user()->id,
                        'created_at' => Carbon::now()->toDateTimeString(),
                    ]);

                } catch (Throwable $e) {
                    report($e);

                    return response()->json($e, 500);
                }
            }
        }

        $product->save();
        $product->categories()->sync(request()->selected_categories);

        // $path = '';
        $message = "product updated!";
        return response()->json([
            'message' => $message
        ], 200);
    }

    public function canvas_update()
    {
        $data = Product::find(request()->id);
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

        $data = Product::find(request()->id);
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

        $data = Product::find(request()->id);
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
            $check = Product::where('id',$item->id)->first();
            if(!$check){
                try {
                    Product::create((array) $item);
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
