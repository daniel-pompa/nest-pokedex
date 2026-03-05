import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import type { PokeAPIResponse } from './interfaces/poke-response.interface';
import type { HttpAdapter } from '../common/interfaces/http-adapter.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    @Inject('HTTP_ADAPTER')
    private readonly http: HttpAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    const pokemonToInsert = data.results.map(({ name, url }) => {
      const pokemonNumber = +url.split('/').at(-2)!;
      return { name: name.toLowerCase(), pokemonNumber };
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return {
      message: 'Seed executed successfully',
      count: pokemonToInsert.length,
    };
  }
}
