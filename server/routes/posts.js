const express = require('express');
const router = express.Router();

const Post = require('../models/post');


router.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json({
          message: 'Post fetched successfully!',
          post: post
        });
      } else {
        res.status(404).json({message: 'Post not found!'});
      }
    });
});

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(newPost => {
    res.status(201).json({
      message: 'Post created successfully!',
      postId: newPost._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      res.status(200).json({message: 'Post updated successfully!'});
    });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({message: 'Post deleted successfully!'});
    });
});

module.exports = router;
