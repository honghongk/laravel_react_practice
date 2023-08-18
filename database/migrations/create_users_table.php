<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
// use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {

            // ->primary()->autoIncrements(); 는 뭔 컬럼겹친다고나옴
            // $table->integer('idx',11); 이거 하고 increments 따로 하면 컬럼 겹치는거로 나옴

            $table->increments('idx');
            $table->string('id',20)->unique()->comment('아이디');
            $table->string('password',64)->comment('비번');

            $table->timestamp('created_at')
                ->default(DB::raw('CURRENT_TIMESTAMP'))->comment('등록일시');
            $table->timestamp('updated_at')->nullable()
                ->default(DB::raw('NULL ON UPDATE CURRENT_TIMESTAMP'))->comment('수정일시');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
