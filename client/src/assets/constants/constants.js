module.exports = {
  ADDRESS: process.env.RASPY
    ? 'https://matchanalyzer.duckdns.org/'
    : process.env.DOCKER
    ? 'http://localhost:9009/'
    : 'http://localhost:9000/',
  API_ADDRESS: process.env.RASPY
    ? 'https://matchanalyzer.duckdns.org/v1/'
    : process.env.DOCKER
    ? 'http://localhost:9009/v1/'
    : 'http://localhost:9000/v1/',
  DEFAULT_TEAM_URL: 'assets/images/escudo-vacio.png',
  DEFAULT_PLAYER_URL: 'assets/images/person_icon.png'
  // LOCAL_API_ADDRESS : 'http://37.133.124.200:9000/v1/',
  // LOCAL_ADDRESS : 'http://37.133.124.200:9000/',
}
