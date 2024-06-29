const { Router } = require('express');
const { isLoggedIn, isAdmin, isAdminOrOwner } = require('../Middlewares/UserMiddlewares');

const userController = require('../Controllers/UserController');

const router = new Router();


router.post('/createUser', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/users', isLoggedIn, isAdmin, userController.getUsers);
router.get('/user/:id', isLoggedIn, isAdminOrOwner, userController.getUserById);
router.put('/user/:id', isLoggedIn, isAdminOrOwner, userController.updateUser);
router.delete('/user/:id', isLoggedIn, isAdminOrOwner, userController.deleteUser);
router.put('/user/:id/changePassword', isLoggedIn, isAdminOrOwner, userController.changePassword);
router.get('/me', isLoggedIn, userController.me);

module.exports = router;