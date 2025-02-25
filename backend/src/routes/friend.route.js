// src/routes/friend.route.js

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendList,
  getFriendRequests,
  searchUsers,
} from "../controllers/friend.controller.js";

const router = express.Router();

router.post("/send-request", protectRoute, sendFriendRequest);
router.post("/accept-request", protectRoute, acceptFriendRequest);
router.post("/reject-request", protectRoute, rejectFriendRequest);
router.get("/friends", protectRoute, getFriendList);
router.get("/friend-requests", protectRoute, getFriendRequests);
router.get("/search", protectRoute, searchUsers);

export default router;
