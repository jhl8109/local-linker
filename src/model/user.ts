import {Model, Table, Column, HasMany, PrimaryKey, DataType, AutoIncrement} from 'sequelize-typescript';
import {PostModel} from './post';

@Table
export class UserModel extends Model {
  
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column 
  name!: string;

  @Column
  nickname?: string;

  @HasMany(() => PostModel) 
  posts?: PostModel[];

}