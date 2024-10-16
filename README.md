Match Analyzer
=======

[![Deployment Workflow](https://github.com/manelmendez/matchanalyzer/actions/workflows/deployment.yml/badge.svg)](https://github.com/manelmendez/matchanalyzer/actions/workflows/deployment.yml)

***Have to know***

> - NodeJS project is on "server" folder
> - VueJS project is on "client" folder

***Pre-requisites*** 
> - Install NodeJS => https://nodejs.org/es/
> 
> - Install Postgresql => https://www.postgresql.org/download/

***Steps***

 1. Install server and client dependencies 
 
	> - **On matchAnalyzer/server folder:**
	>
	>  	$`npm install`
	> 
	> - **On matchAnalyzer/client folder:**
	>
	>  	$`npm install`

 2. Build VueJS client 
 
	> - **On matchAnalyzer/server folder:**
	> 
	> 	$`npm run build`
 
 3. Create user and db for this project: 
 
	> - **Run the next commands if you have Postgresql installed and initialized:**
	> 
	> 	$`createuser -s -i -d -r -l -w matchanalyzer`
	> 
	> 	$`createdb matchanalyzer`

	> - **On matchAnalyzer/server folder:**
	> 
	> 	$`psql matchanalyzer < resources/matchanalyzer-pg-local.sql
`
 
 1. Run NodeJS Server (and all the application)
 
	> - **On matchAnalyzer/server folder:**
	>
	> 	$`npm start`
	> 	Server running in http://localhost:9000/

----------
***This is just for Dev Purposes*** 
  
Run VueJS Client 
  

 > - **On matchAnalyzer/client folder:**
 >
 > 	$`npm start`
 > 	Client running in http://localhost:9999/
