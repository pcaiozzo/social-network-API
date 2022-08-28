const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res
    .status(400)
    .send(
      '<div><h1>OOf</h1><img src="./assets/images/404-error-meme.png"></img></div>'
    );
});

module.exports = router;
