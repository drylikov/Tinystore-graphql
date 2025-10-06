import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  createProduct(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create(createProductInput);
    return this.productRepository.save(product);
  }

  getProductsByIds(productIds: string[]): Promise<Product[]> {
    return this.productRepository.findByIds(productIds);
  }

  async updateProduct(updateProductInput: UpdateProductInput) {
    const product = await this.productRepository.findOne(updateProductInput.id);
    const updatedProduct: Product = {
      ...product,
      ...updateProductInput,
    };

    return this.productRepository.save(updatedProduct);
  }
}
