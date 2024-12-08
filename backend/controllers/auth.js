const {StatusCodes} = require('http-status-codes')
const User = require('../models/User');
const CustomError = require('../error/CustomError'); // Assuming you have a custom error handler
const https = require('https')
// Google login handler
const googleLogin = async (req, res) => {
    const { token: accessToken } = req.body; // Access token from client
    
    if (!accessToken) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Access token is required' });
    }

    try {
        // Fetch user profile using the access token
        const url = 'https://www.googleapis.com/oauth2/v2/userinfo'; // Google API endpoint for user info

        https.get(`${url}?access_token=${accessToken}`, (response) => {
            let data = '';

            // Collect the data
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Process the data once complete
            response.on('end', async () => {
                const profile = JSON.parse(data);

                if (profile.error) {
                    throw new CustomError(profile.error.message, StatusCodes.UNAUTHORIZED);
                }

                const { email, name } = profile;
                if (!email || !name) {
                    throw new CustomError('Failed to retrieve email or name from Google profile', StatusCodes.UNAUTHORIZED);
                }

                // Find or create the user in the database
                let user = await User.findOne({ email });
                if (!user) {
                    user = await User.create({
                        name,
                        email,
                        password: email.slice(0, 20), // Use email as placeholder password
                    });
                }

                // Generate a JWT for the user
                const tokenToSend = user.createJWT();

                // Respond with user details and token
                res.status(StatusCodes.OK).json({
                    user: { name: user.name, email: user.email },
                    token: tokenToSend,
                    message: 'Google login successful',
                });
            });
        }).on('error', (err) => {
            console.error('Error fetching Google profile:', err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch Google profile' });
        });
    } catch (error) {
        console.error('Google login error:', error.message);
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: error.message || 'Google login failed. Please try again.',
        });
    }
};

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
        console.log(`${result.deletedCount} rows deleted`); // Log the count
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

module.exports = { register, login, deleteUser, deleteAllUserr, getAll , googleLogin};