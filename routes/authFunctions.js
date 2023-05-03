const express = require("express");
const router = express.Router();
const passport = require("../passport-middleware");
const { forwardAuthenticated } = require("../middleware");
const { createUser } = require("../fake-db");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const user = createUser(req.body);
    //   const user = await prisma.user.create({
    //   data: req.body
    // });
  if (user) {
    res.redirect("/auth/login");
  } else {
    res.redirect("/auth/signup");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/feeds/home",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get("/prismatest", async (req, res) => {
  try {
    // const user = await prisma.user.create({
    //   data: {
    //     username: "selina",
    //     password: "123",
    //     email: "selina@gmail.com",
    //   },
    // });
    const user = await prisma.user.findUnique({
      where: {
        username: "samsmith",
      },
      include: { buckets: true },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
