import express from 'express'
import { buildSchema } from 'type-graphql'
import { ApolloServer} from 'apollo-server-express'
import { UserResolver } from './api/user/user'
import sequelize from "./model/index";

async function createApolloServer(port: number) {
  const app = express()

  const schema = await buildSchema({ resolvers: [UserResolver] }) // 스키마로 변환!
  const server = new ApolloServer({ schema })

  await server.start()
  server.applyMiddleware({ app })

  await new Promise<void>((resolve) => app.listen(port, resolve))
  console.log(`Server running on :${port}`)

   // Sequelize 연결 테스트
   try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return { server, app }
}

createApolloServer(8080)