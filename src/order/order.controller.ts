import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dtos/order.dto';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UseGuards(AuthGuard())
    async addToCart(@Body() item: CreateOrderDto, @Req() req) {
        return this.orderService.placeOrder(item, req.user.email);
    }
    
}