import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Db } from "mongodb";
import { Strategy, ExtractJwt } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) { 
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.SECRET_KEY}`,
    });
  }

  async validate(payload) {
    const { email } = payload;

    const user = await this.db.collection('users').findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
}