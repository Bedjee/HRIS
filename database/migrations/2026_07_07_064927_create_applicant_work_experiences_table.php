<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_work_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->string('company', 200);
            $table->string('position', 200);
            $table->date('date_from');
            $table->date('date_to')->nullable();
            $table->decimal('salary', 12, 2)->nullable();
            $table->string('appointment_status', 50)->nullable();
            $table->boolean('government_service')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index('applicant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_work_experiences');
    }
};
