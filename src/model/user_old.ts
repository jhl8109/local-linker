import { Sequelize, DataTypes, Model, DATE } from 'sequelize';
import sequelize from './index';

// 타입스크립트에 접근할 모델 ( 주요 데이터 ) 
interface UserAttributes{
  id : string;
  name : string;
  nickname : string;
}


export class User extends Model<UserAttributes> {
  id! : string; //PK
  name! : string;
  nickname? : string;
  readonly createdAt! : Date;
  readonly updatedAt! : Date;
}

// 모델 생성
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    freezeTableName: true, // 테이블명 변경 불가
    timestamps: true, // create_at, updated_at 컬럼 생성
    paranoid: true, // deleted_at 컬럼 생성, soft delete 시 나중에 복구 가능
    underscored: true, // 위 세 가지 타임스탬프의 컬럼명 표기법 설정, true로 하면 snake case / false면 camel case
  }
);

// export default function(sequelize: Sequelize) : typeof User{
//   User.init(
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//       },
//       nickname: {
//         type: DataTypes.STRING(20),
//         allowNull: true
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "Users",
//       freezeTableName: true, // 테이블명 변경 불가
//       timestamps: true, // create_at, updated_at 컬럼 생성
//       paranoid: true, // deleted_at 컬럼 생성, soft delete 시 나중에 복구 가능
//       underscored: true, // 위 세 가지 타임스탬프의 컬럼명 표기법 설정, true로 하면 snake case / false면 camel case
//     }
//   )
//   return User
// }