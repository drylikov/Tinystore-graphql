import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreInput } from './inputs/create-store.input';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  getStores(): Promise<Store[]> {
    return this.storeRepository.find({ relations: ['products'] });
  }

  getStore(id: string): Promise<Store> {
    return this.storeRepository.findOne(id, { relations: ['products'] });
  }

  createStore(
    createStoreInput: CreateStoreInput,
    products: Product[],
  ): Promise<Store> {
    const store = this.storeRepository.create({
      name: createStoreInput.name,
      description: createStoreInput.description,
      address: createStoreInput.address,
      phone: createStoreInput.phone,
      email: createStoreInput.email,
      products,
    });
    return this.storeRepository.save(store);
  }

  async assignProductsToStore(
    storeId: string,
    products: Product[],
  ): Promise<Store> {
    const store = await this.storeRepository.findOne(storeId, {
      relations: ['products'],
    });
    if (!store) {
      throw new NotFoundException(`Store with id ${storeId} not found`);
    }
    store.products = [...store.products, ...products];
    return this.storeRepository.save(store);
  }
}
