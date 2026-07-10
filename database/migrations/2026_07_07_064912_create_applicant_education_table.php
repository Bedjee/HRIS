<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->string('level', 50);
            $table->string('school_name', 200);
            $table->string('degree', 200)->nullable();
            $table->year('from_year');
            $table->year('to_year');
            $table->string('units', 20)->nullable();
            $table->year('year_graduated')->nullable();
            $table->string('honors', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('applicant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_education');
    }
};
