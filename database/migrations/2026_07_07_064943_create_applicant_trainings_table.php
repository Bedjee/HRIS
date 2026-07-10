<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_trainings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->string('training_title', 200);
            $table->date('date_from');
            $table->date('date_to')->nullable();
            $table->string('hours', 50)->nullable();
            $table->string('type', 100)->nullable();
            $table->string('conducted_by', 200);
            $table->timestamps();
            $table->softDeletes();

            $table->index('applicant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_trainings');
    }
};
