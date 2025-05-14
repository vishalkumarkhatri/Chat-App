import express from "express";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoutes, getUsersForSidebar);

router.get("/:id", protectRoutes, getMessages);

router.post("/send/:id", protectRoutes, sendMessage);


export default router;