import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeAPIResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    // 1. We clean the database
    await this.pokemonModel.deleteMany({});

    // 2. API request limited to 100
    const { data } = await firstValueFrom(
      this.httpService.get<PokeAPIResponse>('pokemon?limit=100'),
    );

    // 3. Data transformation
    const pokemonToInsert = data.results.map(({ name, url }) => {
      const pokemonNumber = +url.split('/').at(-2)!;
      return { name: name.toLowerCase(), pokemonNumber };
    });

    // 4. Insertion of the new 100 records
    await this.pokemonModel.insertMany(pokemonToInsert);

    return {
      message: 'Seed executed successfully',
      count: pokemonToInsert.length,
    };
  }
}
