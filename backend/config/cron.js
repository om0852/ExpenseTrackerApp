import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request send successfully");
      else {
        console.log("falied");
      }
    })
    .on("error", (e) => console.log("error", e));
});
export default job;
