<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applicant_trainings', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_voluntary_works', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_skills', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_recognitions', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_memberships', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_references', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_eligibilities', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_work_experiences', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });

        Schema::table('applicant_education', function (Blueprint $table) {
            $table->boolean('is_skipped')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('applicant_trainings', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_voluntary_works', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_skills', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_recognitions', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_memberships', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_references', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_eligibilities', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_work_experiences', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });

        Schema::table('applicant_education', function (Blueprint $table) {
            $table->dropColumn('is_skipped');
        });
    }
};




