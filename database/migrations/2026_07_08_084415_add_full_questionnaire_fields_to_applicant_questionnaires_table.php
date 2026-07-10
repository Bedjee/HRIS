<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applicant_questionnaires', function (Blueprint $table) {
            // Q34 - Relationship
            $table->boolean('q34_a')->default(false)->after('remarks');
            $table->boolean('q34_a_third_degree')->default(false)->after('q34_a');
            $table->boolean('q34_a_fourth_degree')->default(false)->after('q34_a_third_degree');
            $table->text('q34_a_details')->nullable()->after('q34_a_fourth_degree');
            $table->boolean('q34_b')->default(false)->after('q34_a_details');

            // Q35 - Administrative/Criminal
            $table->boolean('q35_a')->default(false)->after('q34_b');
            $table->text('q35_a_details')->nullable()->after('q35_a');
            $table->boolean('q35_b')->default(false)->after('q35_a_details');
            $table->text('q35_b_details')->nullable()->after('q35_b');
            $table->date('q35_date_filed')->nullable()->after('q35_b_details');
            $table->string('q35_case_status', 100)->nullable()->after('q35_date_filed');

            // Q36 - Conviction
            $table->boolean('q36')->default(false)->after('q35_case_status');
            $table->text('q36_details')->nullable()->after('q36');

            // Q37 - Separation from service
            $table->boolean('q37')->default(false)->after('q36_details');
            $table->text('q37_details')->nullable()->after('q37');

            // Q38 - Candidacy
            $table->boolean('q38_a')->default(false)->after('q37_details');
            $table->text('q38_a_details')->nullable()->after('q38_a');
            $table->boolean('q38_b')->default(false)->after('q38_a_details');
            $table->text('q38_b_details')->nullable()->after('q38_b');

            // Q39 - Immigrant
            $table->boolean('q39')->default(false)->after('q38_b_details');
            $table->string('q39_country', 100)->nullable()->after('q39');

            // Q40 - Indigenous/PWD/Solo Parent
            $table->boolean('q40_a')->default(false)->after('q39_country');
            $table->string('q40_a_specify', 200)->nullable()->after('q40_a');
            $table->boolean('q40_b')->default(false)->after('q40_a_specify');
            $table->string('q40_b_id', 100)->nullable()->after('q40_b');
            $table->boolean('q40_c')->default(false)->after('q40_b_id');
            $table->string('q40_c_id', 100)->nullable()->after('q40_c');
        });
    }

    public function down(): void
    {
        Schema::table('applicant_questionnaires', function (Blueprint $table) {
            $table->dropColumn([
                'q34_a', 'q34_a_third_degree', 'q34_a_fourth_degree', 'q34_a_details', 'q34_b',
                'q35_a', 'q35_a_details', 'q35_b', 'q35_b_details', 'q35_date_filed', 'q35_case_status',
                'q36', 'q36_details',
                'q37', 'q37_details',
                'q38_a', 'q38_a_details', 'q38_b', 'q38_b_details',
                'q39', 'q39_country',
                'q40_a', 'q40_a_specify', 'q40_b', 'q40_b_id', 'q40_c', 'q40_c_id',
            ]);
        });
    }
};
