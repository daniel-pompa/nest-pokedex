import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  imports: [HttpModule], // Required to provide HttpService to AxiosAdapter
  providers: [
    {
      provide: 'HTTP_ADAPTER',
      useClass: AxiosAdapter,
    },
  ],
  exports: ['HTTP_ADAPTER'],
})
export class CommonModule {}
