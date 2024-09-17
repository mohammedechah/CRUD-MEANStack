const Post = require("../models/post");


exports.createPosts=(req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagepath: url + "/images/" + req.file.filename,
    creator:req.userData.userId,

  });

  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  }).catch(error=>{
    res.status(500).json({
      message:'creating a post failed!!!'
    })
  });
};

exports.updatePost=(req, res, next) => {
  let imagepath = req.body.imagepath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagepath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagepath: imagepath,
    creator:req.userData.userId
  });
  Post.updateOne({ _id: req.params.id,creator:req.userData.userId }, post)
  .then(result=>{
     if(result.matchedCount>0){
    res.status(200).json({ message: "Update successful!" });
  }else{
    res.status(401).json({ message: "Not authorized!" });

  }
  }).catch(error=>{
    res.status(500).json({
      message:"couldn't update post"
    })
  });
}

exports.getPosts=(req, res, next) => {
  const pagesize=+req.query.pagesize;
  const currentpage=+req.query.page;
  const postquery=Post.find();
  let fetchedposts;
  if(pagesize&&currentpage){
    postquery
    .skip(pagesize * ( currentpage - 1 ))
    .limit(pagesize);
  }
       postquery.then(documents => {
        fetchedposts=documents
      return Post.count()
    }).then(count=>{
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedposts,
        maxPosts:count
      });
    }).catch(error=>{
      res.status(500).json({
        message:"couldn't fetched posts"
      })
    });
  }

exports.getPost=(req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  }).catch(error=>{
    res.status(500).json({
      message:"couldn't find posts"
    })
  });
}
exports.deletePost=(req, res, next) => {
  Post.deleteOne({ _id: req.params.id,creator:req.userData.userId }).then(result => {
    console.log(result);
    if(result.deletedCount>0){
      res.status(200).json({ message: "delete successful!" });
    }else{
      res.status(401).json({ message: "Not authorized!" });

    }
  }).catch(error=>{
    res.status(500).json({
      message:"couldn't delete posts"
    })
  });
}
