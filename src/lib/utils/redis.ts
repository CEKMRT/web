import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_URL || !process.env.UPSTASH_REDIS_TOKEN) {
  throw new Error("UPSTASH_REDIS_URL or UPSTASH_REDIS_TOKEN is not defined");
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export default redis;
