import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '../models/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../database';

type UserResponse = Omit<User, 'password'>;

@Injectable()
export class UserService {
  getAllUsers(): UserResponse[] {
    return users.map(({ password, ...user }) => user);
  }

  getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    return { ...newUser, password: undefined };
  }

  updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> | null {
    const user = users.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
    }

    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  deleteUser(id: string): boolean {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  }
}
