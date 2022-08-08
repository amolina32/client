import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    @Inject('SUBSCRIBERS_SERVICE')
    private readonly subscribersService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  //@Cron(CronExpression.EVERY_10_SECONDS)
  @Timeout(2000)
  async createPost() {
    //for (let index = 0; index <= 2000; index++) {
    const user = { name: 'string', id: 1 };
    console.log('Cliente: Enviando usuario: ', user);
    const response = this.subscribersService.send('add-user', user);

    response.subscribe((result) => console.log('Respuesta: ', result));
  }
}
