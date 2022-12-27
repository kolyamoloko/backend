let Post = require('./post.model')

const createPost = async (req, res, Post) => {
    try {
      const doc = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        user: req.userId,
      });
  
      const post = await doc.save();
  
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось создать статью',
      });
    }
  };


module.exports = (Post) => {
    return {
        createPost: createPost(req,res,Post),
    }
}