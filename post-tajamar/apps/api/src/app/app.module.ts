import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlConcatService } from './sql-concat.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SqlConcatService],
})
export class AppModule {}
