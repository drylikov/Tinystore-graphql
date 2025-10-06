import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { StoreType } from './models/store.model';
import { StoreService } from './store.service';
import { ProductService } from 'src/product/product.service';
import { CreateStoreInput } from './inputs/create-store.input';
import { AssignProductsToStore } from './inputs/assing-products-to-store.input';

@Resolver((of) => StoreType)
export class StoreResolver {
  constructor(
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
  ) {}

  @Query((returns) => [StoreType])
  async stores(): Promise<StoreType[]> {
    return this.storeService.getStores();
  }

  @Query((returns) => StoreType)
  async store(@Args('id') id: string): Promise<StoreType> {
    return this.storeService.getStore(id);
  }

  @Mutation((returns) => StoreType)
  async createStore(
    @Args('createStoreInput') createStoreInput: CreateStoreInput,
  ): Promise<StoreType> {
    const products = await this.productService.getProductsByIds(
      createStoreInput.productsIds,
    );
    return this.storeService.createStore(createStoreInput, products);
  }

  @Mutation((returns) => StoreType)
  async assignProductsToStore(
    @Args('assingProductsToStoreInput')
    assingProductsToStoreInput: AssignProductsToStore,
  ): Promise<StoreType> {
    const products = await this.productService.getProductsByIds(
      assingProductsToStoreInput.productsIds,
    );
    return this.storeService.assignProductsToStore(
      assingProductsToStoreInput.storeId,
      products,
    );
  }
}
