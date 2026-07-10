<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applicant_eligibilities', function (Blueprint $table) {

            $table->date('exam_date')->nullable()->change();
            $table->date('valid_until')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('applicant_eligibilities', function (Blueprint $table) {

            $table->date('exam_date')->nullable(false)->change();
            $table->date('valid_until')->nullable(false)->change();
        });
    }
};
