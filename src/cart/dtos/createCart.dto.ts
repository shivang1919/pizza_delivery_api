import {IsNotEmpty} from 'class-validator'
export class CreateCartDto {
    @IsNotEmpty()
    readonly itemId:string;
    @IsNotEmpty()
    readonly item_name: string;
    
    @IsNotEmpty()
    readonly quantity: number;
}