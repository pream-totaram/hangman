import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';
import AuthMiddleware from './auth.middleware';
import { headers } from 'next/headers';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let jwtService: any;
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: any;

  beforeEach(() => {
    jwtService = {
      verifyAsync: vi.fn()
    }

    middleware = new AuthMiddleware(jwtService);
    nextFunction = vi.fn();
    mockResponse = {};
    mockRequest = {
      headers: {}
    };
  });

  it('should progress the request when the token is valid', async () => {
    const mockPayload = { sub: 1, username: 'test' };
    mockRequest.headers.authorization = 'Bearer valid-token';
    jwtService.verifyAsync.mockResolvedValue(mockPayload);

    await middleware.use(mockRequest, mockResponse, nextFunction);

    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token');
    expect(mockRequest.user).toEqual(mockPayload);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('Should throw UnauthorizedException when header is missing', async () => {
    await expect(middleware.use(mockRequest, mockResponse, nextFunction))
      .rejects
      .toThrow(UnauthorizedException);

    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should throw UnauthorizedException when token is invalid", async () => {
    mockRequest.headers.authorization = 'Bearer expired-token';
    jwtService.verifyAsync.mockRejectedValue(new Error('Expired'));

    await expect(middleware.use(mockRequest, mockResponse, nextFunction))
      .rejects
      .toThrow(UnauthorizedException);

    expect(nextFunction).not.toHaveBeenCalled();
  });
});
