import prisma from "../DB/db.config.js";

// * getPosts
export const getComments = async (req, res) => {
    const comments = await prisma.comment.findMany({

    });

    return res.status(200).json({
        success: true,
        message: "comments fetched successfully!!",
        data: comments,
    })


}

export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    await prisma.post.update({
        where: {
            id: post_id
        },
        data: {
            comment_count: {
                increment: 1
            }
        }
    });
    const newComment = await prisma.comment.create({
        data: {

            user_id: Number(user_id),
            post_id: Number(post_id),
            comment

        }
    });

    return res.status(201).json({
        success: true,
        message: "Comment added successfully!!",
        data: newComment

    })

}

// * Show User
export const showPost = async (req, res) => {
    const postId = req.params.id;
    const post = await prisma.comment.findUnique({
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

    const updatedPost = await prisma.comment.update({
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
    const deletedPost = await prisma.comment.delete({
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