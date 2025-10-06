import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from 'src/product/types/product.type';

@ObjectType('Store')
export class StoreType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => [ProductType], { defaultValue: [] })
  products: ProductType[];
}
