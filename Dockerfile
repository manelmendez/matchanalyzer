FROM node:11.12.0-alpine

# setting up MatchAnalyzer
ARG environment
RUN echo "environment: $environment"
RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm install --production --silent \
 && apk del .build-deps
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
