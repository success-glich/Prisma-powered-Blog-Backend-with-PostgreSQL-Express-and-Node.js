import prisma from "../DB/db.config.js";

// * getUsers
export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            // post: {
            //     select: {
            //         id: true, comment_count: true, title: true

            //     }
            // },
            // Comment: true
            _count: {
                select: {
                    post: true
                }
            }
        }
    });

    //get number of post and comment true 
    // const users = await prisma.user.findMany({
    //     select: {
    //         _count: {
    //             select: {
    //                 post: true,
    //                 Comment: true
    //             }
    //         }
    //     }
    // })

    return res.status(200).json({
        success: true,
        message: "Users fetched successfully!!",
        data: users,
    })


}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (findUser) {
        return res.status(400).json({
            success: false,
            message: "User already exist"
        })
    }
    const newUser = await prisma.user.create({
        data: {

            name, email, password
        }
    });
    return res.status(201).json({
        success: true,
        message: "User created successfully!!",
        data: newUser

    })

}

// * Show User
export const showUser = async (req, res) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    });

    return res.status(200).json({
        success: true,
        message: "User fetched successfully!!",
        data: user,
    })

}

// * Update the user
export const updateUser = async (req, res) => {

    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            email,
            password
        }
    });
    return res.status(200).json({
        success: true,
        message: "User updated successfully!!",
        data: updatedUser,
    })


}


// * Delete the user

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(userId)
        }
    });
    return res.status(200).json({
        success: true,
        msg: "user deleted successfully !!!",
        data: deletedUser
    })
}