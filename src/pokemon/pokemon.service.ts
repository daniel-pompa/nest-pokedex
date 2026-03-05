import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    const pokemon = await this.pokemonModel.create(createPokemonDto);
    return pokemon;
  }

  async findAll(paginationDto: PaginationDto): Promise<Pokemon[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ pokemonNumber: 1 })
      .select('-__v');
  }

  async findOne(searchTerm: string): Promise<Pokemon> {
    searchTerm = searchTerm.trim().toLowerCase();

    let pokemon: Pokemon | null = null;

    const pokemonNumber = Number(searchTerm);

    if (!isNaN(pokemonNumber)) {
      pokemon = await this.pokemonModel.findOne({ pokemonNumber });
    }

    if (!pokemon && isValidObjectId(searchTerm)) {
      pokemon = await this.pokemonModel.findById(searchTerm);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: searchTerm });
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with search term "${searchTerm}" not found`,
      );
    }

    return pokemon;
  }

  async update(
    searchTerm: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const pokemon = await this.findOne(searchTerm);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    pokemon.set(updatePokemonDto);

    await pokemon.save();

    return pokemon;
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon with id "${id}" not found`);
    }
    return;
  }
}
