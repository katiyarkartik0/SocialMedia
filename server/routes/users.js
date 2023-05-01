import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ OPERATION
router.get("/:id", verifyToken, getUser);
router.get("/:id", verifyToken, getUserFriends);

//UPDATE OPERATION
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
