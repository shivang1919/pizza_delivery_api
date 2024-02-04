import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateCartDto } from './dtos/createCart.dto';

@Injectable()
export class CartService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db,
    ) { }

    async getCartItem(email: string) {
        try {
            var items = await this.db.collection('users').findOne({ email: email });
            var CartItem = new Array();
            for (let data of items.cart) {
                var item = await this.db.collection('items').findOne({ _id: new ObjectId(data.itemId) });
                CartItem.push(item);
            }
            return { CartItem };
        } catch (error) {
            console.error(error);
        }
    }

    async addToCart(body: CreateCartDto, email: string) {
        try {
            var item = await this.db.collection('users').findOne({ email: email });
            if (typeof item.cart === "undefined") {
                var CartItems = await this.db.collection('users').updateOne({ email: email }, { $push: { cart: body } });
                return { CartItems };
            } else if (this.isItemInCart(item.cart, body) != 0) {
                var quantity = this.isItemInCart(item.cart, body);
                var CartItems = await this.db.collection('users').updateOne({ email: email, 'cart.itemId': body.item_name }, { $set: { 'cart.$.quantity': quantity } });
                return { CartItems };
            } else {
                var CartItems = await this.db.collection('users').updateOne({ email: email }, { $push: { cart: body } });
                return { CartItems };
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteCartItem(id: number, email: string) {
        try {
            var CartItems = await this.db.collection('users').updateOne({ email: email, 'cart.itemId': id }, { $pull: { 'cart': { itemId: id } } });
            return CartItems;
        } catch (error) {
            console.error(error);
        }
    }

    isItemInCart(item1, item2): number {
        for (let i = 0; i < item1.length; i++) {
            if (item1[i].itemId == item2.itemId) {
                var quantity = Number(item1[i].quantity) + Number(item2.quantity);
                return quantity;
            }
        }
        return 0;
            
    }
}