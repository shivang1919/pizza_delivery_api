import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  street_address: string;
}