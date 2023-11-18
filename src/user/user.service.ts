import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { UserInput } from './user.input';
import { ObjectId } from 'mongodb'; // Use ObjectID from mongodb
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
        user._id = new ObjectId();
        user.username = input.username;
        user.password = input.password;
        return this.userRepository.save(user);
    }

    async updateUser(id: string, input: UserInput): Promise<User> {
        const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
    
        user.username = input.username;
        user.password = input.password;
    
        return this.userRepository.save(user);
    }
    
    async delete(id: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({_id: new ObjectId(id)});
    
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
    
        await this.userRepository.remove(user);
        
        return true;
    }
}
