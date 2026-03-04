import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokeAPIResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}

  async executeSeed() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<PokeAPIResponse>('pokemon?limit=10'),
      );

      const pokemonToInsert = data.results.map(({ name, url }) => {
        const pokemonNumber = +url.split('/').at(-2)!;
        return { name, url, pokemonNumber };
      });

      return pokemonToInsert;
    } catch {
      throw new InternalServerErrorException(
        'Error fetching data from PokéAPI',
      );
    }
  }
}
