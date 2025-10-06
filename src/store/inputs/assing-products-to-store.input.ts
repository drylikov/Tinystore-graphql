import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AssignProductsToStore {
  @Field()
  storeId: string;

  @Field(() => [String], { nullable: true })
  productsIds: string[];
}
