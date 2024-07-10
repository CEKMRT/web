import { NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';
import redis from '@/lib/utils/redis';
// import { MRTNewsItem } from '@/lib/definition/def';

const CACHE_KEY = 'mrt_news_latest';
const CACHE_TTL = 24 * 60 * 60; // 24 hours in seconds

export async function GET() {
  try {
    // Try to get cached data
    const cachedData = await redis.get(CACHE_KEY);
    
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // If no cached data, scrape the website
    const { data } = await axios.get('https://jakartamrt.co.id/id/siaran-pers', {
      headers: {
        'User-Agent': 'News Feed (cekmrt.xyz)'
      }
    });
    const $ = cheerio.load(data);
    
    const newsItems: MRTNewsItem[] = [];
    $('.thumb-item').each((index, element) => {
      const title = $(element).find('h3').text().trim();
      const date = $(element).find('span').text().trim();
      const link = $(element).find('a').attr('href') || '';
      newsItems.push({ title, date, link });
    });

    // Cache the new data
    await redis.set(CACHE_KEY, JSON.stringify(newsItems), { ex: CACHE_TTL });

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Error scraping MRT news:', error);
    return NextResponse.json({ error: 'Error scraping MRT news' }, { status: 500 });
  }
}