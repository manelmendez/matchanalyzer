import pg from 'pg'
const {Client} = pg
const client = new Client({
  user: 'matchanalyzer',
  host: 'localhost',
  database: 'matchanalyzer',
  password: 'matchanalyzer',
  port: 5432,
})
client.connect()

// let competition = {
//   name: '2a División Grupo 5asdasd',
//   season: '19/21',
//   discipline: 'F8',
//   category: 'Alevín',
//   manager: 4,
//   signupdate: Date.now(),
//   userid: 4
// }
// client.query('INSERT INTO competitions(name, season, discipline, category, manager, signupdate, userid) VALUES($1,$2,$3,$4,$5,to_timestamp($6 / 1000.0),$7)', 
//   [competition.name, competition.season, competition.discipline, competition.category, 
//   competition.manager, competition.signupdate, competition.userid], (err, res) => {
//   console.log(err, res)
// })

// client.query('select * from competitions', (err, res) => {
//   console.log(err, res)
// })

export default client