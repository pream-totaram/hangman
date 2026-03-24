import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) { }
  async use(req: any, res: any, next: (error?: any) => void) {
    throw new Error('Method not implemented.');
  }
}
