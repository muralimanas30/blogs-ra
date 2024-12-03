const { StatusCodes } = require('http-status-codes');
const CustomError = require('../error/CustomError');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({
            user: { name: user.name, id: user._id, email: user.email },
            token,
            message: "REGISTRATION SUCCESSFUL"
        });
    } catch (error) {
        // Check for specific error types or provide a generic message
        const statusCode = error.name === 'ValidationError' ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR;
        throw new CustomError(error.message || 'Registration failed', statusCode);
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError('No account with entered email', 404);
    }
    // console.log(`user from login ${user}`);

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError('Incorrect password', 401);
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { name: user.name, id: user._id, email: user.email },
        token,
        message: "LOGIN SUCCESSFUL"
    });
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate if `userId` is provided
        if (!userId) {
            throw new CustomError('User ID is required', 400);
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        res.status(StatusCodes.OK).json({ message: 'User successfully deleted' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const deleteAllUserr = async (req, res) => {
    try {
        // Deleting all users
        const result = await User.deleteMany({});
        // console.log(`${result.deletedCount} rows deleted`); // Log the count
        return res.status(StatusCodes.OK).json({
            message: `${result.deletedCount} rows deleted`
        });
    } catch (error) {
        // console.error('Error deleting users:', error.message); // Log error for debugging
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        // Fetching all users
        const users = await User.find({});
        if (users.length) {
            return res.status(StatusCodes.OK).json({
                users: users, // Directly return the array
                message: "FETCH SUCCESSFUL"
            });
        } else {
            return res.status(StatusCodes.OK).json({
                users: [],
                message: "No users found"
            });
        }
    } catch (error) {
        // console.error('Error fetching users:', error.message); // Log error for debugging
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = { register, login, deleteUser, deleteAllUserr, getAll };