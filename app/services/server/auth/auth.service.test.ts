import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import AuthService from './auth.service';
import UsersService from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    userId: 1,
    email: "test@test.com",
    password: "correctPassword"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: vi.fn()
          }
        },
        {
          provide: JwtService,
          useValue: { signAsync: vi.fn() }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it("Should return a 401 when credentials are invalid", async () => {
    vi.spyOn(usersService, 'findOne').mockResolvedValue(mockUser as any);

    const result = service.signIn('test@test.com', 'wrongPassword');
    await expect(result).rejects.toThrow(UnauthorizedException)
  })

  it("Should return a token for valid credentials", async () => {
    const mockToken = 'test-token';

    vi.spyOn(usersService, 'findOne').mockResolvedValue(mockUser as any);
    vi.spyOn(jwtService, 'signAsync').mockResolvedValue(mockToken);

    const result = await service.signIn('test@test.com', 'correctPassword');

    expect(result).toEqual({ access_token: mockToken });
  });


});
