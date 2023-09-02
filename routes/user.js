import express from "express";
import passport from "passport";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);


router.get(
  "/login",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),function(req,res){
    res.redirect("http://localhost:3000")
    console.log("Response we get", res.user, res.cookies);
  }
);

router.get("/me", isAuthenticated, myProfile);

router.get("/logout", logout);

// Admin Routes
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

export default router;
