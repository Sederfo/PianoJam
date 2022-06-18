const { faker } = require('@faker-js/faker');

module.exports.generateRoomId = async (req, res, next) =>{
  try {
      const roomId = faker.word
      .adjective()
      .concat(faker.music.genre())
      .replace(/\s/g, "");
      
      return res.json({ status: true, roomId });
    } catch (ex) {
      next(ex);
    }
}
