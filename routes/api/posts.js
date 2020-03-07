const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load validation
const validatePostInput = require("../../validation/post");

//Load  model
const Post = require("../../models/post");
const Profile = require("../../models/profile");

//@route    GET api/posts/test
//@desc     test posts route
//@access   public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

//@route    GET api/posts
//@desc     get posts
//@access   public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

//@route    GET api/posts/:id
//@desc     get posts
//@access   public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that Id" })
    );
});

//@route    Post api/posts
//@desc     create post route
//@access   private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route    DELETE /api/posts/:id
//@desc     delete post
//@access   private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check post owner
          if (profile.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "user not authorized" });
          }

          //delete
          post.remove().then(() => res.json({ suceess: true }));
        })
        .catch(err =>
          res.status(400).json({ nopostfound: "no post found with this Id" })
        );
    });
  }
);

//@route    POST /api/posts/like/:id
//@desc     like post
//@access   private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "user already like this post" });
          }

          //add user id to the likes array
          post.likes.unshift({ user: req.user.id });

          //save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(400).json({ nopostfound: "no post found with this Id" })
        );
    });
  }
);

//@route    POST /api/posts/unlike/:id
//@desc     unlike post
//@access   private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "you have not liked this post" });
          }

          //get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //splice out of the array
          post.likes.splice(removeIndex, 1);

          //save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(400).json({ nopostfound: "no post found with this Id" })
        );
    });
  }
);

//@route    POST /api/posts/comment/:id
//@desc     add comment on a post
//@access   private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.body.user
        };

        //add comment
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(400).json({ postnotfound: "post not found" }));
  }
);

//@route    DELETE /api/posts/comment/:id/:comment_id
//@desc     remove comment from post
//@access   private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, comment_id } = req.params;
    Post.findById(id)
      .then(post => {
        if (
          post.comments.filter(comment => comment._id.toString() === comment_id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ commentnotexists: "comment does not exists" });
        }

        //get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(comment_id);

        //splice out of the array
        post.comments.splice(removeIndex, 1);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(400).json({ nopostfound: "no post found with this Id" })
      );
  }
);

module.exports = router;
