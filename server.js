import Nullstack from 'nullstack'
import { MongoClient } from 'mongodb'
import cookieSession from 'cookie-session'

import Application from './src/Application'

const context = Nullstack.start(Application)

context.server.use(
  cookieSession({
    name: 'session',
    keys: ['token'],
  }),
)


context.start = async function start() {
  const { secrets, settings } = context
  const databaseClient = new MongoClient(secrets.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await databaseClient.connect()

  context.database = databaseClient.db(secrets.databaseName)
}

export default context
