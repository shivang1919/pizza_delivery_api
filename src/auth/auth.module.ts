import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: `${process.env.SECRET_KEY}`,
          signOptions: {
            // expiresIn: `${process.env.SECRET_EXPIRES}`,
            expiresIn: "5d",
          },
        };
      },
    }),
    DatabaseModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}