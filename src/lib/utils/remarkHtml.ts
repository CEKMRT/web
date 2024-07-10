// Dipakai untuk convert completion Open AI API
import html from 'remark-html';
import { remark } from 'remark';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
