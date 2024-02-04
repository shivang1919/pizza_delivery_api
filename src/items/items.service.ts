import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class ItemsService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db,
    ) {}

    async getAll() {
        try {
            var items = await this.db.collection('items').find({}).toArray();
            return { Items: items };
        } catch (error) {
            console.error(error);
        }
    }
}