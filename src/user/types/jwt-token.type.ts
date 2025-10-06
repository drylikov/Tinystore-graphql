import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('JwtToken')
export class JwtTokenType {
  @Field()
  accessToken: string;
}
