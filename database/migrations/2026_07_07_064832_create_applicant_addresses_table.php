<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->enum('type', ['Residential', 'Permanent']);
            $table->string('house_no', 50)->nullable();
            $table->string('street', 100)->nullable();
            $table->string('subdivision', 100)->nullable();
            $table->string('barangay', 100);
            $table->string('city', 100)->index();
            $table->string('province', 100)->index();
            $table->string('zip_code', 10);
            $table->timestamps();
            $table->softDeletes();

            $table->index('applicant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_addresses');
    }
};
