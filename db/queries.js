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

const getFolderById = async (id) => {
  return await prisma.folder.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      files: true
    }
  })
}

const getFileById = async (id) => {
  return await prisma.file.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

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

const createFile = async (cloudinaryUrl, publicId, folderId, file) => {

  const newFile = await prisma.file.create({
    data: {
      fileUrl: cloudinaryUrl,
      publicId: publicId,
      folderId: folderId,
      name: file.originalname,
      size: file.size
    },
  });

  return newFile;
};

const userOwnsFolder = async (userId, folderId) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: parseInt(folderId)
    }
  })

  if (folder.userId !== userId) {
    return false;
  }
  return true;
}

const userOwnsFile = async (userId, fileId) => {
  const file = await prisma.file.findUnique({
    where: {id: parseInt(fileId)},
    include: {
      folder: {
        select: {
          userId: true
        }
      }
    }
  })

  if (!file) return false;

  return file.folder.userId === userId;
}

const renameFolder = async (folderId, newName) => {
  return await prisma.folder.update({
    where: {
      id: parseInt(folderId) },
      data: {
        name: newName
      }
  })
}

const deleteFolder = async (folderId) => {
  return await prisma.folder.delete({
    where: {
      id: parseInt(folderId)
    }
  })
}

const deleteFile = async (fileId) => {
  return await prisma.file.delete({
    where: {
      id: parseInt(fileId)
    }
  })
}

module.exports = {
  getUserByUsername,
  getUserById,
  userTaken,
  createUser,
  createFolder,
  getUserByIdWithFolders,
  getFoldersByUserId,
  createFile,
  userOwnsFolder,
  renameFolder,
  deleteFolder,
  getFolderById,
  userOwnsFile,
  deleteFile,
  getFileById
};
