import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCartDto } from './dtos/createCart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @UseGuards(AuthGuard())
    async getCartItem(@Req() req) {
        return this.cartService.getCartItem(req.user.email);
    }

    @Post()
    @UseGuards(AuthGuard())
    async addToCart(@Body() item: CreateCartDto, @Req() req) {
        return this.cartService.addToCart(item, req.user.email);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: number, @Req() req) {
        return this.cartService.deleteCartItem(id, req.user.email);
    }

}