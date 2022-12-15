import PostModel from "../models/Post";
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            group: req.body.group,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            stars: stars,
            user: req.userId,
        })
        const post = await doc.save()
        res.json(post);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error',
        });
    }
}