import { NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';
import redis from '@/lib/utils/redis';

const CACHE_KEY = 'mrt_news_latest';
const CACHE_TTL = 24 * 60 * 60; 

export const dynamic = 'force-dynamic';

interface NewsItem {
  title: string;
  date: string;
  link: string;
  image: string;
}

async function scrapeWebsite(): Promise<NewsItem[]> {
  const { data } = await axios.get('https://jakartamrt.co.id/id/siaran-pers', {
    headers: {
      'User-Agent': 'News Feed (cekmrt.xyz)'
    }
  });
  const $ = cheerio.load(data);
  
  const newsItems: NewsItem[] = [];
  $('.thumb-item').each((index, element) => {
    const title = $(element).find('h3').text().trim();
    const date = $(element).find('span').text().trim();
    const link = $(element).attr('href') || '';
    const image = $(element).find('img').attr('src') || '';

    newsItems.push({ title, date, link, image });
  });

  return newsItems;
}

export async function GET() {
  try {
    let newsItems: NewsItem[] | null = null;

    try {
      const cachedData = await redis.get(CACHE_KEY);
      if (cachedData && typeof cachedData === 'string') {
        newsItems = JSON.parse(cachedData);
      }
    } catch (error) {
      console.error('Error accessing Redis:', error);
    }

    if (!newsItems) {
      newsItems = await scrapeWebsite();
      
      try {
        await redis.set(CACHE_KEY, JSON.stringify(newsItems), { ex: CACHE_TTL });
      } catch (error) {
        console.error('Error caching data:', error);
      }
    }

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Error fetching MRT news:', error);
    return NextResponse.json({ error: 'Error fetching MRT news' }, { status: 500 });
  }
}