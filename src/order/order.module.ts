import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../database.model';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports:[AuthModule, 
    DatabaseModule,
    
  ],
  providers: [OrderService, OrderService],
  controllers: [OrderController]
})
export class OrderModule {}