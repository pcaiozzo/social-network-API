const { User, Thought } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend(req, res) {
    console.log("id: ", req.params.userId, " Friend: ", req.params.friendId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).then((dbUserId) => {
      if (!dbUserId) {
        return res.status(404).json({ message: "No friend" });
      }
      res.json(dbUserId);
    });
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).then((dbUserId) => {
      if (!dbUserId) {
        return res.status(404).json({ message: "No friend" });
      }
      res.json(dbUserId);
    });
  },
};

module.exports = userController;
