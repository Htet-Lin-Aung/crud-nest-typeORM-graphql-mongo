import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository, ObjectId } from 'typeorm';
import { UserInput } from './user.input';
import * as uuid from 'uuid';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(input: UserInput): Promise<User> {
        const user = new User();
        user.id = uuid.v4();
        user.username = input.username;
        user.password = input.password;
        return this.userRepository.save(user);
    }
}
