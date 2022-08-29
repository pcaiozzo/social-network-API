const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1> This is not where you're supposed to be!<h1>");
});

module.exports = router;
