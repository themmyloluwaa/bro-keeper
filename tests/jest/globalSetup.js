require('@babel/register');
require('@babel/polyfill/noConflict');
const server = require('../../src/server').default;

// export the async function to start the server before our test runs.
// assign a variable to the global object for usage throughout our app.
module.exports = async () => {
    global.httpServer = await server.start({port: 4000});
}

