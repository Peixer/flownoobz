import axios from 'axios'
import context from '../.production/server.js'

async function run() {
  await context.start()
  
  await setPlayers(context)
  await setTeams(context)
}

async function setPlayers({ database }) {
  const response = await axios({
    method: 'get',
    url: 'http://data.nba.net/prod/v1/2022/players.json ',
  })

  const promises = []

  response.data.league.standard.forEach((standard) => {
    promises.push(
      database.collection('players').insertOne({
        firstName: standard.firstName,
        lastName: standard.lastName,
        personId: standard.personId,
        teamId: standard.teamId,
        dateOfBirthUTC: standard.dateOfBirthUTC,
        teams: standard.teams,
        image: `https://cdn.nba.com/headshots/nba/latest/1040x760/${standard.personId}.png`,
      }),
    )
  })
  console.log("Phew, all setup, now let's just wait for the promises to finish...")
  await Promise.all(promises)
}

async function setTeams({ database }) {
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

run().then(() => process.exit(0))
