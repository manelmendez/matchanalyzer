module.exports = {
  ADDRESS : process.env.HEROKU ? 'https://matchanalyzer.herokuapp.com/' : process.env.DOCKER ? 'https://37.133.124.200:8008/' : 'http://localhost:8000/',
  API_ADDRESS : process.env.HEROKU ? 'https://matchanalyzer.herokuapp.com/api/' : process.env.DOCKER ? 'https://37.133.124.200:8008/api/' : 'http://localhost:8000/api/',
  DEFAULT_TEAM_URL: 'assets/images/escudo-vacio.png',
  DEFAULT_PLAYER_URL: 'assets/images/person_icon.png',
  // LOCAL_API_ADDRESS : 'http://37.133.124.200:9000/api/',
  // LOCAL_ADDRESS : 'http://37.133.124.200:9000/',
}