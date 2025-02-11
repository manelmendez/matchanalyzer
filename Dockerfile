FROM node:23-alpine

# setting up MatchAnalyzer
ARG environment
RUN echo "environment: $environment"
RUN apk add --no-cache g++ make python3
# set work directory on Docker
WORKDIR /projects/matchanalyzer

# Copy project from Host to Docker
COPY ./ ./

# Install server dependencies
RUN npm install

# Run server
EXPOSE 9000
CMD [ "npm", "start" ]
