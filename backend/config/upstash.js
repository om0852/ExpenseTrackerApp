import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import 'dotenv/config';

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '60 s'),
  // optionally:
  // analytics: true,
  // prefix: '@upstash/ratelimit',
  // timeout: 5000
});

export default ratelimit;
