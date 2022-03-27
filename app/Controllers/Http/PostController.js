"use strict";
const Post = use("App/Models/Post");
const { validate } = use("Validator");
class PostController {
  async index({ view }) {
    const posts = await Post.all();
    return view.render("posts.index", {
      title: "My Posts",
      posts: posts.toJSON(),
    });
  }
  async details({ view, params }) {
    const post = await Post.find(params.id);
    return view.render("posts.details", {
      title: "Post Details",
      post: post,
    });
  }
  async add({ view }) {
    return view.render("posts.add", {
      title: "Add Post",
    });
  }
  async store({ request, response, session }) {
    const rules = {
      title: "required|min:3|max:255",
      body: "required|min:3",
    };
    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }
    const post = new Post();
    post.title = request.input("title");
    post.body = request.input("body");
    await post.save();
    session.flash({ msg: "Post Added" });
    return response.redirect("/posts");
  }

  async editView({ params, view }) {
    const post = await Post.find(params.id);
    return view.render("posts.edit", {
      post: post,
    });
  }

  async edit({ params, request, response, session }) {
    const rules = {
      title: "required|min:3|max:255",
      body: "required|min:3",
    };
    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }
    const post = await Post.find(params.id);
    post.title = request.input("title");
    post.body = request.input("body");
    await post.save();
    session.flash({ msg: "Post updated successfully" });
    return response.redirect("/posts");
  }

  async delete({ params, session, response }) {
    const post = await Post.find(params.id);
    await post.delete();
    session.flash({ msg: "Post deleted successfully" });
    return response.redirect("/posts");
  }
}

module.exports = PostController;
