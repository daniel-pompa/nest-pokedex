import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [
    HttpModule.register({ baseURL: 'https://pokeapi.co/api/v2/' }),
    PokemonModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
