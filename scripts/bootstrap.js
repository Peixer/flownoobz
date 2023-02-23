import context from '../.production/server.js'

async function run() {
  await context.start();
  const database = context.database;

  // load the JSON file
}

run().then(() => process.exit(0));
