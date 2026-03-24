import { describe, vi, it, expect, beforeEach } from "vitest";
import HashService from "./hash.service";
import RegistrationService from './registration.service';
import { TestingModule, Test } from "@nestjs/testing";

describe('Registration Process', () => {
  let service: RegistrationService;
  let hashService: HashService;
  const registrationDto = { email: 'test@test.com', password: 'cleartext' };

  const mockRepo = {
    findByEmail: vi.fn(),
    save: vi.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        {
          provide: HashService,
          useValue: {
            hash: vi.fn().mockResolvedValue('$2a$12$ObjpnfCQ/evRRkDTq3EU8eawohu8xltseN/ieK3RG8Jel0RzUvT0K')
          }
        }
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
    hashService = module.get<HashService>(HashService);
  });

  it("Should hash the password and save the user", async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.save.mockResolvedValue({ id: 1 });

    const result = await service.register(registrationDto);

    expect(hashService.hash).toHaveBeenCalledWith('cleartext');
    expect(mockRepo.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('should throw error when email exists', async () => {
    mockRepo.findByEmail.mockResolvedValue(registrationDto);

    await expect(service.register(registrationDto))
      .rejects
      .toThrow('User already exists');

    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});

