export interface NewsItem {
  title: string;
  date: string;
  link: string;
  image: string;
  source: string;
}
export interface ScrapingConfig {
  url: string;
  articleSelector: string;
  titleSelector: string;
  dateSelector: string;
  linkSelector: string;
  imageSelector: string;
  baseUrl?: string;
  transformers?: {
    title?: (el: cheerio.Cheerio) => string;
    date?: (el: cheerio.Cheerio) => string;
    link?: (el: cheerio.Cheerio, baseUrl: string) => string;
    image?: (el: cheerio.Cheerio, baseUrl: string) => string;
  };
}
