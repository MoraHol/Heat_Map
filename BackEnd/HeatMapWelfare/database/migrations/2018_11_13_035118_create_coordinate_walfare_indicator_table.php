<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoordinateWalfareIndicatorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coordinate_welfare_indicator', function (Blueprint $table) {
            $table->unsignedInteger('coordinate_id');
            $table->unsignedInteger('welfare_indicator_id');
            $table->unsignedInteger('score');
            $table->timestamps();
            $table->foreign('coordinate_id')->references('id')->on('coordinates')->onDelete('cascade');
            $table->foreign('welfare_indicator_id')->references('id')->on('welfare_indicators')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coordinate_walfare_indicator');
    }
}
