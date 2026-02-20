import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/core/entities';
import { DataUsersService } from 'src/data-access/users';
import { JWT_CONSTANTS, JwtService } from 'src/common/jwt';
import { AuthOutboundDto, LoginInboundDto, RegisterInboundDto } from './dtos';
import { AuthError } from './errors/auth.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataUsersService: DataUsersService,
    @Inject(JWT_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private readonly jwtService: JwtService,
  ) {}

  public async login({ email, password }: LoginInboundDto) {
    return this.validateUser(
      await this.dataUsersService.findOne({ email }),
      password,
    );
  }

  public async register({
    email,
    password,
  }: RegisterInboundDto): Promise<AuthOutboundDto> {
    const candidate = await this.dataUsersService.findOne({
      email,
    });

    if (candidate) {
      throw AuthError.AlreadyExists();
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = await this.dataUsersService.save(
      new User({
        email,
        password: hashedPassword,
      }),
    );

    const jwtPair = this.jwtService.generatePair({
      id: user.id,
    });

    return {
      ...jwtPair,
    };
  }

  public async validateUser(
    user: User,
    password: string,
  ): Promise<AuthOutboundDto> {
    if (!user) {
      throw AuthError.WrongLoginOrPassword();
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw AuthError.WrongLoginOrPassword();
    }

    const jwtPair = this.jwtService.generatePair({
      id: user.id,
    });

    return {
      ...jwtPair,
    };
  }
}
