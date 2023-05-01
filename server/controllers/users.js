import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const userFriendsIds = user.friends;
    const friends = await Promise.all(
      userFriendsIds.map((friendId) => User.findById(friendId))
    );
    console.log(friends);
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    const userFriendsIds = user.friends;
    const friendFriendsIds = friend.friends;

    if (userFriendsIds.includes(friendId)) {
      user.friends = userFriendsIds.filter(
        (uniqueFriendId) => uniqueFriendId !== friendId
      );
      friend.friends = friendFriendsIds.filter(
        (uniqueFriendId) => uniqueFriendId !== id
      );
    } else {
      userFriendsIds.push(friendId);
      friendFriendsIds.push(id);
      user.friends = userFriendsIds;
      friend.friends = friendFriendsIds;
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      userFriendsIds.map((friendId) => User.findById(friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
