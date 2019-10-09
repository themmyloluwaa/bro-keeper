// close or stop the server once our test suit has run
module.exports = async () => {
    await global.httpServer.close();
}
