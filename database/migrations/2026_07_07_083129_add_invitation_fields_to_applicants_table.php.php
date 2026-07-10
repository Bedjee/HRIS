<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applicants', function (Blueprint $table) {
            $table->timestamp('invited_at')->nullable()->after('status');
            $table->foreignId('invited_by')
                  ->nullable()
                  ->after('invited_at')
                  ->constrained('users')
                  ->onDelete('set null');
            $table->timestamp('submitted_at')->nullable()->after('invited_by');
        });
    }

    public function down(): void
    {
        Schema::table('applicants', function (Blueprint $table) {
            $table->dropForeign(['invited_by']);
            $table->dropColumn(['invited_at', 'invited_by', 'submitted_at']);
        });
    }
};
