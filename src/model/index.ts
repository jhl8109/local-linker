import {Sequelize} from 'sequelize-typescript';
import { PostModel } from './post';
import { UserModel } from './user';


const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'pwd',
    database: 'graphql',
    // models: [__dirname + '/model'], // 모델 파일이 있는 디렉터리 지정
    models: [UserModel, PostModel]
});
// sequelize.addModels([UserModel])
// sequelize.addModels([PostModel])
sequelize.sync() 
        .then(() => {
            console.log("Create Users Table Successfully");
        })
        .catch((err : Error) => {
            console.log("Error detected in Create User Table : ", err);
        });

export default sequelize;