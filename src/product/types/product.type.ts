import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StoreType } from 'src/store/models/store.model';

@ObjectType('Product')
export class ProductType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  price: number;

  @Field((type) => [StoreType], { defaultValue: [] })
  stores: StoreType[];
}
