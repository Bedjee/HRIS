<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_eligibilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->string('eligibility_name', 200);
            $table->decimal('rating', 5, 2)->nullable();
            $table->date('exam_date')->nullable();
            $table->string('exam_place', 200)->nullable();
            $table->string('license_number', 50)->nullable();
            $table->date('valid_until')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('applicant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_eligibilities');
    }
};
