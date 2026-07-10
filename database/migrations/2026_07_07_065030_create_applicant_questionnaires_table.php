<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_questionnaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->unique()
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->boolean('criminal_case')->default(false);
            $table->boolean('administrative_case')->default(false);
            $table->boolean('candidate')->default(false);
            $table->boolean('resigned_before_election')->default(false);
            $table->boolean('indigenous')->default(false);
            $table->boolean('pwd')->default(false);
            $table->boolean('solo_parent')->default(false);
            $table->boolean('immigrant')->default(false);
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_questionnaires');
    }
};
