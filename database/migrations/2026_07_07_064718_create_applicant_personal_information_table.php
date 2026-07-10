<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applicant_personal_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                  ->unique()
                  ->constrained('applicants')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->string('surname', 100);
            $table->string('first_name', 100);
            $table->string('middle_name', 100)->nullable();
            $table->string('extension_name', 20)->nullable();
            $table->date('birth_date');
            $table->string('birth_place', 200);
            $table->enum('sex', ['Male', 'Female']);
            $table->enum('civil_status', ['Single', 'Married', 'Widowed', 'Separated', 'Divorced']);
            $table->string('citizenship', 50);
            $table->string('dual_citizenship_type', 50)->nullable();
            $table->string('dual_country', 100)->nullable();
            $table->decimal('height', 5, 2)->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->enum('blood_type', ['A', 'B', 'AB', 'O'])->nullable();
            $table->string('philhealth_no', 20)->nullable();
            $table->string('philsys_no', 20)->nullable();
            $table->string('pagibig_no', 20)->nullable();
            $table->string('tin_no', 20)->nullable();
            $table->string('agency_employee_no', 30)->nullable();
            $table->string('telephone', 20)->nullable();
            $table->string('mobile', 15)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicant_personal_information');
    }
};
