import { Redis } from "@upstash/redis";
import {  Ratelimit } from "@upstash/ratelimit";
import "dotenv/config";
const ratelimit = new Redis({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(100,"60 s")});


export default ratelimit