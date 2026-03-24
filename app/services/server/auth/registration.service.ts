import { Injectable } from '@nestjs/common';

@Injectable()
export default class RegistrationService {
  constructor(private mockRepo: any, private mockHasher: any) {

  }

  async register(registrationDto: any) { }
}
