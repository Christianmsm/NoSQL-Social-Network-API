const router = require('express').Router();

const {getUsers, getSingleUser, createUser, addUserFriend, updateUser, deleteUser, deleteUserFriend}  = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/userId/friends').post(addUserFriend);
router.route('/userId/friends/:friendsId').delete(deleteUserFriend);

module.exports = router;