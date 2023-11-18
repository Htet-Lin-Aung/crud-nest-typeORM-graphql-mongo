import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { UserInput } from './user.input';
import { ObjectId } from 'mongodb'; // Use ObjectID from mongodb
import * as bcrypt from 'bcrypt';
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
        const salt = await bcrypt.genSalt();
        const user = new User();
        user._id = new ObjectId();
        user.username = input.username;
        user.password = await bcrypt.hash(input.password, salt);
        return this.userRepository.save(user);
    }

    async updateUser(id: string, input: UserInput): Promise<User> {
        const salt = await bcrypt.genSalt();
        const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
    
        user.username = input.username;
        user.password = await bcrypt.hash(input.password, salt);
    
        return this.userRepository.save(user);
    }
    
    async delete(id: string): Promise<void> {
        const user = await this.userRepository.findOneBy({_id: new ObjectId(id)});
    
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
    
        await this.userRepository.remove(user);
      }
}
