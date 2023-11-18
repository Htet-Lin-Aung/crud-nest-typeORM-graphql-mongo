import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectId;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;
}
