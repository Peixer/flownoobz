import axios from 'axios'
import context from '../.production/server.js'

async function run() {
  await context.start()

  await fetchAndStoreTeams(context)
  await fetchAndStorePlayers(context)
  await fetchAndStoreTeamsFromNBAGraphQL(context)
}

async function fetchAndStorePlayers({ database }) {
  const response = await axios({
    method: 'get',
    url: 'http://data.nba.net/prod/v1/2022/players.json ',
  })

  const promises = []

  for (let index = 0; index < response.data.league.standard.length; index++) {
    const standard = response.data.league.standard[index]
    const team = await database.collection('teams').findOne({ teamId: standard.teamId })

    promises.push(
      database.collection('players').insertOne({
        firstName: standard.firstName,
        lastName: standard.lastName,
        personId: standard.personId,
        teamId: standard.teamId,
        dateOfBirthUTC: standard.dateOfBirthUTC,
        teams: standard.teams,
        image: `https://cdn.nba.com/headshots/nba/latest/1040x760/${standard.personId}.png`,
        team,
      }),
    )
  }

  console.log("Phew, all setup, now let's just wait for the promises to finish...")
  await Promise.all(promises)
}

async function fetchAndStoreTeams({ database }) {
  const response = await axios({
    method: 'get',
    url: 'https://data.nba.net/data/10s/prod/v2/2022/teams.json',
  })

  const promises = []

  response.data.league.standard.forEach((standard) => {
    promises.push(
      database.collection('teams').insertOne({
        city: standard.city,
        fullName: standard.fullName,
        teamId: standard.teamId,
        image: `https://cdn.nba.com/logos/nba/${standard.teamId}/global/L/logo.svg`,
      }),
    )
  })

  console.log("Phew, all setup, now let's just wait for the promises to finish...")
  await Promise.all(promises)
}

async function fetchAndStoreTeamsFromNBAGraphQL({ database }) {
  const response = await axios({
    method: 'post',
    url: 'https://public-api.nbatopshot.com/graphql',
    data: {
      operationName: 'AllTeams',
      variables: {},
      query: `query AllTeams {
        allTeams {
            size
            data {
                id
                name
            }
        }
    }`,
    },
  })

  const promises = []

  response.data.data.allTeams.data.forEach((team) => {
    promises.push(database.collection('officialTeams').insertOne(team))
  })

  console.log("Phew, all setup, now let's just wait for the promises to finish...")
  await Promise.all(promises)
}

run().then(() => process.exit(0))
