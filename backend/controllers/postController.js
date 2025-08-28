import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

        if (!postedBy || !text) {
            return res.status(400).json({ message: "Postedby and text fields are required!" })
        }

        const user = await User.findById(postedBy);
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not Authorized" })
        }

        const maxLen = 500;
        if (text.length > maxLen) {
            return res.status(400).json({ message: `Text must be less than ${maxLen} chars` })
        }

        const newPost = new Post({ postedBy, text, img });
        await newPost.save();

        res.status(201).json({ message: "Post created successfully", newPost })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error in createPost : `, error.message);

    }
}

const getPost = async (req, res) => {

    try {
        const post = await Post.findById( req.params.postId );

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        res.status(200).json({ post })


    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error in getPost : `, error.message);
    }
}

export const postController = {
    createPost,
    getPost
}