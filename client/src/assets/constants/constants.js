module.exports = {
  ADDRESS : process.env.RASPY ? 'https://matchanalyzer.duckdns.org/' : 'http://localhost:9000/',
  API_ADDRESS : process.env.RASPY ? 'https://matchanalyzer.duckdns.org/api/' : 'http://localhost:9000/api/',
  DEFAULT_TEAM_URL: 'assets/images/escudo-vacio.png',
  DEFAULT_PLAYER_URL: 'assets/images/person_icon.png',
  // LOCAL_API_ADDRESS : 'http://37.133.124.200:9000/api/',
  // LOCAL_ADDRESS : 'http://37.133.124.200:9000/',
};