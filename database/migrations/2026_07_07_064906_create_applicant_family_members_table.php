<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->enum('relationship', ['Father', 'Mother', 'Spouse', 'Child', 'Sibling']);
            $table->string('full_name', 200);
            $table->date('birth_date')->nullable();
            $table->string('occupation', 200)->nullable();
            $table->string('contact_no', 15)->nullable();
            $table->string('address', 255)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('applicant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_family_members');
    }
};
