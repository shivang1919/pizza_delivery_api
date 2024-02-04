import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.model';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [DatabaseModule, AuthModule, ItemsModule, CartModule,ConfigModule.forRoot(), OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}