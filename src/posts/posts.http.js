const postControllers = require("./posts.controllers");

const getAll = (req, res) => {
  const data = postControllers.getAllPosts();
  return res.status(200).json({ items: data.length, posts: data });
};

const getCreate = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (!data.title || !data.content) {
    return res.status(400).json({
      message: "all fields must be completed",
      fields: {
        title: "string",
        content: "string",
        header_image: "example.com/img (opcional)",
      },
    });
  } else {
    const response = postControllers.createPost(data);
    return res
      .status(201)
      .json({
        message: `Post created succesfully with: ${response.id}`,
        post: response,
      });
  }
};

const getById = (id) => {
  const id = req.params.id;
  const data = postControllers.getPostById();

  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(400).json({ message: `El post con el ${id} no existe` });
  }
};

// protegidas

const getAllPostUser = (req, res) => {
  const id = req.user.id;
  const data = postControllers.getPostByUser(id);
  return res.status(200).json(data);
};

const getPostEspecifiUser = (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  const post = postControllers.getPostUserById(id, user);
  if (post) {
    return res.status(200).json(post);
  } else {
    return res.status(400).json({ message: "Post doest not exist" });
  }
};

const editPostByUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = req.user.id;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing data" });
  } else if (!data.title || !data.content) {
    return res.status(400).json({
      message: "All field must be completed",
      fields: {
        title: "string",
        content: "string",
        header_image: "example.com/img (opcional)",
      },
    });
  } else {
    const response = postControllers.createPost(id, data, user);
    return res
      .status(201)
      .json({ message: "Post edit succesfully", post: response });
  }
};

const removePostByUser = (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  const data = postControllers.deletePostByUser(id, user);
  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

module.exports = {
  getAll,
  getCreate,
  getById,

  getAllPostUser,
  getPostEspecifiUser,
  editPostByUser,
  removePostByUser,
};
