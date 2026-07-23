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
    Schema::create('applicant_children', function (Blueprint $table) {
        $table->id();
        $table->foreignId('applicant_id')->constrained()->cascadeOnDelete();
        $table->string('full_name');
        $table->date('birth_date')->nullable();
        $table->timestamps();
        $table->softDeletes();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_children');
    }
};
