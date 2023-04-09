require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

app.get("/", (req, res) => {
  res.send("Check the tweets done on @karanveer43fp on twitter.com");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const tweet = async () => {
  let number = Math.random();
  try {
    await twitterClient.v2.tweet(`I am random ${number} tweet`);
  } catch (e) {
    console.log(e);
  }
};

const cronTweet = new CronJob("30 * * * * *", async () => {
  tweet();
});

cronTweet.start();
