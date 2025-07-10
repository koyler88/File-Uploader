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
      password: password,
    },
  });

  return newUser;
};

const createFolder = async (user, folderName) => {
  await prisma.folder.create({
    data: {
      name: folderName,
      userId: user.id,
    },
  });

  return true;
};

const getUserByIdWithFolders = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { folders: true },
  });
};

const getFoldersByUserId = async (id) => {
  return await prisma.folder.findMany({
    where: {
      userId: id,
    },
  });
};

const createFile = async (file, folderId) => {
  if (!file) throw new Error("No file uploaded");

  const newFile = await prisma.file.create({
    data: {
      fileUrl: `/data/uploads/${file.filename}`,
      folderId: folderId,
    },
  });

  return newFile;
};

module.exports = {
  getUserByUsername,
  getUserById,
  userTaken,
  createUser,
  createFolder,
  getUserByIdWithFolders,
  getFoldersByUserId,
  createFile
};
