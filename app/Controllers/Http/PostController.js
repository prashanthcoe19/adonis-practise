"use strict";

class PostController {
  async index({ view }) {
    const posts = [
      { title: "Post One", body: "1" },
      { title: "Post Two", body: "2" },
      { title: "Post Three", body: "3" },
    ];
    return view.render("posts.index", {
      title: "My Posts",
      posts: posts,
    });
  }
}

module.exports = PostController;
