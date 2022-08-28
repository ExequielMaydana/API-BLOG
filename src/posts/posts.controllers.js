const uuid = require("uuid");

const postsDB = [];

/*
{
	"id": "uuid",
	"title": "string",
	"content":"string",
	"header_image": "url_to_img",
	"user_id": "uuid",//Aqui hara referencia al usuario de tu userDB
	"published": true
}
*/

const createPost = (user, data) => {
  
  const newPost = {
    id: uuid.v4(),
    title: data.title,
    content: data.content,
    header_image: data.header_image ? data.header_image : " ",
    user_id: user,
    published: true,
  };
  
  postsDB.push(newPost);
  return newPost;
};

const getAllPosts = () => {
  return postsDB;
};

const getPostById = (id) => {
  const data = postsDB.filter((post) => post.id === id);
  return data.length ? data[0] : null;
};

//? /api/v1/users/me/posts

const getPostByUser = (id) => {
  const data = postsDB.filter((item) => item.user_id === id);
  return data;
};

//? /api/v1/users/me/posts/:id

const getPostUserById = (id, user) => {
  const data = postsDB.filter((e) => e.user_id === user);
  const postUser = data.filter((post) => post.id === id);
  return postUser.length ? postUser[0] : null;
};

const editPostByUser = (id, data, user) => {
  const index = postsDB.findIndex((item) => item.user_id === user);
  if (index !== 1) {
    postsDB[index] = {
      id: id,
      title: data.title,
      content: data.content,
      header_image: data.header_image ? data.header_image : " ",
      user_id: user_id,
      published: true,
    };
    return postsDB[index];
  } else {
    return createPost(data);
  }
};

const deletePostByUser = (id, user) => {
  const index = postsDB.filter((e) => e.user_id === user && e.id === id);
  if (index.length) {
    const index = postsDB.findIndex((user) => user.id === id);
    postsDB.splice(index, 1);
    return true;
  } else {
    return false;
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostByUser,
  getPostUserById,
  editPostByUser,
  deletePostByUser,
};
