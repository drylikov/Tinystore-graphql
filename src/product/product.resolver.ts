import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { GqlAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './inputs/create-product.input';
import { ProductType } from './types/product.type';
import { ProductService } from './product.service';
import { UpdateProductInput } from './inputs/update-product.input';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductType])
  async products() {
    return this.productService.getProducts();
  }

  @Mutation(() => ProductType)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.createProduct(createProductInput);
  }

  @Query(() => ProductType)
  @UseGuards(GqlAuthGuard)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.updateProduct(updateProductInput);
  }
}
