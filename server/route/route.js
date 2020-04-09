const userController = require('../controllers/userController');
const ipAuthController = require('../controllers/ipAuthController');

const userRoutes = [
    {
        url: '/api/user/post',
        method:'POST',
        handler: userController.addUser
    }
];

const ipAuthRoutes = [
    {
        url: '/api/ip/check',
        method: 'GET',
        handler: ipAuthController.checkIP
    }
];

module.exports = {
    userRoutes,
    ipAuthRoutes
}