FROM node:22-alpine

# setting up MatchAnalyzer
ARG environment
RUN echo "environment: $environment"
RUN apk add --no-cache g++ make python3
# set work directory on Docker
WORKDIR /projects/matchanalyzer

# Copy project from Host to Docker
COPY ./ ./

# Install server dependencies
RUN cd server && npm install

# Install client dependencies and build it
RUN cd client && npm install && npm run ${environment}

# Run server
WORKDIR /projects/matchanalyzer/server

EXPOSE 9000
CMD [ "npm", "start" ]
