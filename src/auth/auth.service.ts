import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Db } from 'mongodb';
import { SignUpDto } from './dtos/signup.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db,
        private jwtService: JwtService,
    ) { }

    async signUp(body: SignUpDto): Promise<{ token: string }> {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user: User = {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            street_address: body.street_address
        }
        var response = await this.db.collection('users').findOne({ email: body.email });

        if (!response) {
            await this.db.collection('users').insertOne(user);
            const token = this.jwtService.sign({ email: user.email });
            return { token };
        } else {
            throw new UnauthorizedException('Email already exist')
        }

    }

    async login(body: LoginDto): Promise<{ token: string }> {
        const { email, password } = body;

        var user = await this.db.collection('users').findOne({ email: email });

        if (!user) {
            throw new UnauthorizedException('Invalid Email')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid Password')
        } else {
            const token = this.jwtService.sign({ email: user.email });
            return { token };
        }
    }
}