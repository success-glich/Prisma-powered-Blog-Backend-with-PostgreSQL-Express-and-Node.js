import prisma from "../DB/db.config.js";

// * getPosts
export const getPosts = async (req, res) => {

    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    if (page <= 0) {
        page = 1;
    }
    if (limit <= 0 || limit > 10) {
        limit = 10
    }
    const skip = (page - 1) * limit;
    const users = await prisma.post.findMany({
        skip: skip,
        take: limit,
        include: {
            Comment: true
        }

    });

    return res.status(200).json({
        success: true,
        message: "Users fetched successfully!!",
        data: users,
    })


}

export const createPost = async (req, res) => {
    const { user_id, title, description } = req.body;


    const newPost = await prisma.post.create({
        data: {

            user_id: Number(user_id),
            title,
            description,

        }
    });

    return res.status(201).json({
        success: true,
        message: "Post created successfully!!",
        data: newPost

    })

}

// * Show User
export const showPost = async (req, res) => {
    const postId = req.params.id;
    const post = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        }
    });

    return res.status(200).json({
        success: true,
        message: "User fetched successfully!!",
        data: post,
    })

}

// * Update the user
export const updatePost = async (req, res) => {

    const { id } = req.params;
    const { user_id, title, description } = req.body;

    const updatedPost = await prisma.post.update({
        where: {
            id: Number(id)
        },
        data: {
            user_id: Number(user_id),
            title,
            description
        }
    });
    return res.status(200).json({
        success: true,
        message: "Posts updated successfully!!",
        data: updatedPost,
    })


}


// * Delete the user

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const deletedPost = await prisma.post.delete({
        where: {
            id: Number(postId)
        }
    });
    return res.status(200).json({
        success: true,
        msg: "Post deleted successfully !!!",
        data: deletedPost
    })
}

// * To Search the post
export const searchPost = async (req, res) => {
    const query = req.query.q;
    const posts = await prisma.post.findMany({
        where: {
            description: {
                search: query
            }
        }
    });

    return res.json({ status: 200, data: posts });
};
