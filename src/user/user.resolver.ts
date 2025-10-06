import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './types/user.type';
import { CreateUserInput } from './inputs/create-user.input';
import { ConfirmUserInput } from './inputs/confirm-user.input';
import { LoginInput } from './inputs/login.input';
import { JwtTokenType } from './types/jwt-token.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  async registerUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType)
  async confirmUser(
    @Args('createUserInput') confirmUserInput: ConfirmUserInput,
  ): Promise<UserType> {
    return this.userService.confirmUser(confirmUserInput);
  }

  @Query(() => JwtTokenType)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<JwtTokenType> {
    return this.userService.login(loginInput);
  }
}
