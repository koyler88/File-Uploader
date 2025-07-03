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

const userTaken = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    return true;
  }

  return false;
};

const createUser = async (username, password) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })

  return newUser;
}

module.exports = {
  getUserByUsername,
  getUserById,
  userTaken,
  createUser
};
