import 'reflect-metadata';
import { ObjectType, Field, ID, Int, Resolver, Query, Mutation, Arg } from 'type-graphql'
import { UserModel } from '../../model/user';

@ObjectType() // type User { ...
export class User {
  @Field(type => ID) // id: ID!
  id!: number;

  @Field(type => String) // name: String!
  name!: string;

  @Field(type => String, { nullable: true }) // point: Int
  nickname?: string;
}

@Resolver(User) // User 클래스에 대한 리졸버.
export class UserResolver {
  @Query(returns => [User])
  async getAllUsers() {
    return await UserModel.findAll();
  }
  @Query(returns => User, { nullable: true }) // 쿼리에 대한 상세 구현
  async getUser(
    @Arg('id', type => Number) id: number
  ): Promise<User|null> {
    // db에 접속해서 유저 정보 반환
    return await UserModel.findOne({
      where : {id : id}
    })
  }

  @Mutation(returns => User) // 뮤테이션에 대한 상세 구현
  async addUser(
    @Arg('name', type => String) name: string,
    @Arg('nickname', type => String, { nullable: true }) nickname?: string
  ): Promise<User|null> {
    // db에 접속해서 유저 추가
    return await UserModel.create({
      name : name,
      nickname : nickname
    });
  }
}