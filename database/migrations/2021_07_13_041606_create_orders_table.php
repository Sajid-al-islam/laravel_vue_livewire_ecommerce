<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('user_id',100)->nullable();
            $table->string('order_status',200)->default('pending');
            $table->string('total_price',100)->nullable();
            $table->string('sub_total',100)->nullable();
            $table->string('invoice_id',100)->nullable();
            $table->string('invoice_date',100)->nullable();
            $table->string('delivery_date',100)->nullable();
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
