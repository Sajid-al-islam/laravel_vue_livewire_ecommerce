<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_information', function (Blueprint $table) {
            $table->id();
            $table->string('customer_id', 100)->nullable();
            $table->string('order_id', 100)->nullable();
            $table->string('invoice_id', 100)->nullable();
            $table->string('product_id', 100)->nullable();
            $table->string('product_code', 100)->nullable();
            $table->string('product_name', 100)->nullable();
            $table->string('qty', 100)->nullable();
            $table->string('color', 100)->nullable();
            $table->string('size', 100)->nullable();
            $table->string('price', 100)->nullable();
            $table->string('creator', 100)->nullable();
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
        Schema::dropIfExists('order_information');
    }
}
