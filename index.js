require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const { download } = require("./utilities");

app.get("/", (req, res) => {
  res.send("Check the tweets done on @karanveer43fp on twitter.com");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const tweet = async () => {
  const uri = "https://i.imgur.com/bDcJmR4.jpeg";
  const filename = "image.png";

  download(uri, filename, async function () {
    try {
      const mediaId = await twitterClient.v1.uploadMedia("./image.png");
      await twitterClient.v2.tweet({
        text: "Heyy guys, look at the spectacular Milky-way Galaxy",
        media: {
          media_ids: [mediaId],
        },
      });
    } catch (e) {
      console.log(e);
    }
  });
};

const cronTweet = new CronJob("30 * * * * *", async () => {
  tweet();
});

cronTweet.start();
