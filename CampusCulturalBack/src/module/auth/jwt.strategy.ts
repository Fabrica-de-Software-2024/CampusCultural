import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    } satisfies StrategyOptions);
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { sub, ...rest } = payload;
    delete rest.iat;

    return { id_usuario: sub, ...rest };
  }
}
