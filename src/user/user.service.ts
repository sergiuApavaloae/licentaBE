import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UserRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addUser(user: User) {
    return await this.usersRepository.save(user);
  }

  async updateUser(user: User) {
  //   const found: User = await this.usersRepository.findOne(user);
  //   if (found) {
  //     return await this.usersRepository.save(user);
  //   } else return;
  // }
}
}
