const prisma = require("./prismaClient");

const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getUserByUsername,
  getUserById
};
