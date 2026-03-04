import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [HttpModule.register({ baseURL: 'https://pokeapi.co/api/v2/' })],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
