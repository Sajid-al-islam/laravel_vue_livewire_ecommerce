<?php

use App\Http\Controllers\Auth\ApiLoginController;
use App\Http\Livewire\Login;
use App\Http\Livewire\Register;
use App\Http\Livewire\ShowPosts;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::group(['prefix' => '', 'namespace' => "Livewire"], function () {
    Route::get('/', "ShowPosts");
    Route::get('/login', "Login");
    Route::get('/register', "Register");
});

Route::group( ['prefix'=>'','namespace' => "Controllers" ],function(){
    Route::get('/website','WebsiteController@website');
    Route::get('/invoice/{invoice}', 'WebsiteController@invoice_download')->name('invoice');
});

Route::get('/t', function () {
    // return view('test');
    ini_set('max_execution_time', '0');
    foreach (\App\Models\Product::get() as $item) {
        // \App\Models\ProductStock::insert([
        //     'product_id' => $item->id,
        //     'purchase_date' => $item->created_at,
        //     'qty' => $item->track_inventory_on_the_variant_level_stock,
        // ]);
        // \App\Models\ProductStockLog::insert([
        //     'product_id' => $item->id,
        //     'qty' => $item->track_inventory_on_the_variant_level_stock,
        //     'type' => 'initial',
        //     'creator' => auth()->user()->id,
        // ]);
    }
});

Route::get('/admin', function () {
    return view('backend.dashboard');
})->name('admin');

Route::get('/data-reload', function () {
    \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--seed' => true]);
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--path' => 'vendor/laravel/passport/database/migrations', '--force' => true]);
    \Illuminate\Support\Facades\Artisan::call('passport:install');
    return redirect()->back();
});

Route::get('/cat',function(){
    return response()->json(\App\Models\Category::select(['id','name','parent_id'])->get());
});

