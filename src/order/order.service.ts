import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

import { CreateOrderDto } from './dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
    
  ) { }


  async placeOrder(body: CreateOrderDto, email: string) {
    var users = await this.db.collection('users').findOne({ email: email });
    var item = await this.db.collection('items').findOne({ _id: new ObjectId(body.itemId) });
    const user = {
      name: users.name,
      email: users.email,
      Item: item.item_name,
    }
    var res = await this.db.collection('order').insertOne(user);
    
    return res;
  }
}