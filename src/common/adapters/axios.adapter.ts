import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  // Inject the NestJS HttpService instead of using raw axios
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.httpService.get<T>(url));
      return data;
    } catch (error) {
      throw new Error('Error fetching data - Check logs');
    }
  }
}
