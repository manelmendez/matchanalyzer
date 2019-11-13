module.exports = {
  ADDRESS : process.env.HEROKU ? 'https://matchanalyzer.herokuapp.com/' : process.env.DOCKER ? 'https://37.133.124.200:9009/' : 'http://localhost:9000/',
  API_ADDRESS : process.env.HEROKU ? 'https://matchanalyzer.herokuapp.com/api/' : process.env.DOCKER ? 'https://37.133.124.200:9009/api/' : 'http://localhost:9000/api/',
  DEFAULT_TEAM_URL: 'assets/images/escudo-vacio.png',
  DEFAULT_PLAYER_URL: 'assets/images/person_icon.png',
  // LOCAL_API_ADDRESS : 'http://37.133.124.200:9000/api/',
  // LOCAL_ADDRESS : 'http://37.133.124.200:9000/',
}