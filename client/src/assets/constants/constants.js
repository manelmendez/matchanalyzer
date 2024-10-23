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
  DEFAULT_PLAYER_URL: 'assets/images/person_icon.png',
  years: [
    '1980',
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020'
  ],
  seasons: [
    '21/22',
    '20/21',
    '19/20',
    '18/19',
    '17/18',
    '16/17',
    '15/16',
    '14/15',
    '13/14',
    '12/13',
    '11/12',
    '10/11'
  ],
  disciplines: ['F7', 'F11'],
  categoriesF7: ['Prebenjamín', 'Benjamín', 'Alevín'],
  categoriesF11: ['Infantil', 'Cadete', 'Juvenil', 'Amateur'],
  positions: ['PT', 'LD', 'LI', 'CT', 'MCD', 'MC', 'MP', 'ED', 'EI', 'DC']
  // LOCAL_API_ADDRESS : 'http://37.133.124.200:9000/v1/',
  // LOCAL_ADDRESS : 'http://37.133.124.200:9000/',
}
