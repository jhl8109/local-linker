import {Model, Table, Column, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

import {UserModel} from './user';

@Table
export class PostModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column text!: string;
  @ForeignKey(() => UserModel) @Column userId!: number;
  @BelongsTo(() => UserModel) user?: UserModel;
}