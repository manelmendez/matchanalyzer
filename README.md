Match Analyzer
=======

[![Deployment Workflow](https://github.com/manelmendez/matchanalyzer/actions/workflows/deployment.yml/badge.svg)](https://github.com/manelmendez/matchanalyzer/actions/workflows/deployment.yml)

***Have to know***

> - This is the server NodeJS project 
> - Client VueJS project is no longer in this project. Check the client repo in: 
  >  [Macthanalyzer Front](https://github.com/manelmendez/matchanalyzer/matchanalyzer-front.git)
  >  [Macthanalyzer Vuetify Front](https://github.com/manelmendez/matchanalyzer-front-vuetify.git)

***Pre-requisites if you want to run it in your PC (dev)*** 
> - Install NodeJS => https://nodejs.org/es/
> 
> - Install Postgresql => https://www.postgresql.org/download/

***Steps***

 1. Install server dependencies 
 
	> - **On matchAnalyzer folder:**
    >   ```bash
    > 	npm install
    >   ```
 
 2. Create user and db for this project: 
 
	> - **Run the next commands if you have Postgresql installed and initialized:**
    >   ```bash
    > 	createuser -s -i -d -r -l -w matchanalyzer
    >   ```
    >   ```bash
    > 	createdb matchanalyzer
    >   ```

	> - **On matchAnalyzer folder:**
    >   ```bash
    > 	psql matchanalyzer < resources/matchanalyzer-pg-local.sql
    >   ```
 
 3. Run NodeJS Server
 
	> - **On matchAnalyzer folder:**
    >   ```bash
    > 	npm start
    >   ```
	> 	Server running in http://localhost:9000/