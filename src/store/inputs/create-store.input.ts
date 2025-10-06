import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateStoreInput {
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

  @Field(() => [String], { nullable: true })
  productsIds: string[];
}
