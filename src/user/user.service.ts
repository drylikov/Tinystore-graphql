import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { ConfirmUserInput } from './inputs/confirm-user.input';
import { UserErrors } from './enum/user-errors.enum';
import { LoginInput } from './inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({
    username,
    email,
    password,
  }: CreateUserInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
      confirmToken: nanoid(32),
    };

    return this.userRepository.save(user);
  }

  async confirmUser({ email, confirmToken }: ConfirmUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user || user.confirmToken !== confirmToken) {
      throw new UnauthorizedException(
        UserErrors.INVALID_CONFIRM_TOKEN_OR_EMAIL,
      );
    }

    user.active = true;
    user.confirmToken = null;
    return this.userRepository.save(user);
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ email });

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!user || !isPassValid) {
      throw new UnauthorizedException(UserErrors.INVALID_LOGIN);
    }
    if (!user.active) {
      throw new UnauthorizedException(UserErrors.CONFIRM_TOKEN_NOT_VALIDATED);
    }

    const payload: IJwtPayload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
