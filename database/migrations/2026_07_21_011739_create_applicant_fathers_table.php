<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('applicant_fathers', function (Blueprint $table) {
        $table->id();
        $table->foreignId('applicant_id')->constrained()->cascadeOnDelete();
        $table->string('surname');
        $table->string('first_name');
        $table->string('middle_name')->nullable();
        $table->string('extension_name')->nullable();
        $table->timestamps();
        $table->softDeletes();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_fathers');
    }
};
