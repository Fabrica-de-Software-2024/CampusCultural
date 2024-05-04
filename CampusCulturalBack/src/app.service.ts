import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return (`<head><meta http-equiv="refresh" content="0; URL='/api'"/></head>`);
  }
}
