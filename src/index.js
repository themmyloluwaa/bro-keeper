// import needed files, pubsub for subscription, graphqlserver for node server
// and all resolver files.
import '@babel/polyfill/noConflict';
import server from './server'

// started server and passed resolver functions
server.start({ port: process.env.PORT || 4000 },() => {
    console.log(`The server is up! at ${process.env.PORT || 4000}`);
})