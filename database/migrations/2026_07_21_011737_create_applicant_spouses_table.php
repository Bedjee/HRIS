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
    Schema::create('applicant_spouses', function (Blueprint $table) {
        $table->id();
        $table->foreignId('applicant_id')->constrained()->cascadeOnDelete();
        $table->string('surname')->nullable();
        $table->string('first_name')->nullable();
        $table->string('middle_name')->nullable();
        $table->string('extension_name')->nullable();
        $table->string('occupation')->nullable();
        $table->string('employer_business_name')->nullable();
        $table->string('business_address')->nullable();
        $table->string('telephone_number')->nullable();
        $table->timestamps();
        $table->softDeletes();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_spouses');
    }
};
