import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database.model';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}