const express = require('express');
const { connectToMongo } = require("./connect")
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { timeStamp } = require('console');
const app = express();
const PORT = 8006;

connectToMongo('mongodb://localhost:27017/short-url')
.then(() => {
  console.log("MongoDB connected");
} )
app.use(express.json());
app.use("/url",urlRoute);

app.get('/:shortId', async( req,res) => {
  const shortId = req.params.shortId;
    const entry =await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory:{
            timeStamp:Date.now(),
          },
        },

      }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT ,() => {
  console.log(`Server running at PORT${PORT}`)
});

