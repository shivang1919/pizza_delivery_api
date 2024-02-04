
import {Controller,Get,UseGuards} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import { ItemsService } from './items.service';
@Controller('menu-items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}
    
    @Get()
    @UseGuards(AuthGuard())
    getAll() {
        return this.itemService.getAll();
    }

}