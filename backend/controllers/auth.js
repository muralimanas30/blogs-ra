const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const user = await User.create(req.body);
    // console.log(`user from register ${user}`);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name, id: user._id, email: user.email },
        token,
        message: "REGISTRATION SUCCESSFUL"
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Please provide email and password');
    
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('No account with entered email');
    }
    // console.log(`user from login ${user}`);
    
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new Error('Incorrect password');
    
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
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User ID is required' });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
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
