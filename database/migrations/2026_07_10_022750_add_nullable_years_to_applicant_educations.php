<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applicant_education', function (Blueprint $table) {

            $table->year('from_year')->nullable()->change();
            $table->year('to_year')->nullable()->change();
            $table->year('year_graduated')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('applicant_education', function (Blueprint $table) {

            $table->year('from_year')->nullable(false)->change();
            $table->year('to_year')->nullable(false)->change();
            $table->year('year_graduated')->nullable(false)->change();
        });
    }
};
