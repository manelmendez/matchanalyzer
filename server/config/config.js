module.exports = {
  port: process.env.PORT || 9000,
  // db: process.env.MONGODB_URI || 'mongodb://localhost:27017/matchAnalyzer',
  db: process.env.MONGODB_URI || 'mongodb+srv://manel:manel@matchanalyzer-fusdr.gcp.mongodb.net/matchanalyzer?retryWrites=true&w=majority',
  SECRET_TOKEN: 'claveincreiblementecomplicada'
}