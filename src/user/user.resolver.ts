import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './user.input';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    
    @Query(() => String)
    async hello(){
        return await 'world';
    }

    @Query(() => [User])
    async getAllUsers() {
        return this.userService.findAll();
    }

    @Mutation(() => User)
    async createUser(@Args('input') input: UserInput) {
        return await this.userService.createUser(input);
    }

    @Mutation(() => User)
    async updateUser(@Args('id') id: string, @Args('input') input: UserInput) {
      return this.userService.updateUser(id, input);
    }
  
    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: string) {
      await this.userService.delete(id);
      return true; // or a success message
    }
}
