const scrapingConfigs: Record<string, ScrapingConfig> = {
  Berita_MRT: {
    url: "https://jakartamrt.co.id/id",
    articleSelector: "ul.thumb-list.thumb-list-home.row li",
    titleSelector: ".thumb-info h3",
    dateSelector: ".thumb-info span",
    linkSelector: "a.thumb-item",
    imageSelector: ".thumb-img img",
    baseUrl: "https://jakartamrt.co.id",
  },
  Berita: {
    url: "https://jakartamrt.co.id/id/siaran-pers",
    articleSelector: "ul.thumb-list.row li",
    titleSelector: ".thumb-info h3",
    dateSelector: ".thumb-info span",
    linkSelector: "a.thumb-item",
    imageSelector: ".thumb-img img",
    baseUrl: "https://jakartamrt.co.id",
  },
  Detik: {
    url: "https://www.detik.com/tag/mrt",
    articleSelector: "article",
    titleSelector: "h3, h2",
    dateSelector: ".date",
    linkSelector: "a",
    imageSelector: "img",
  },
  Tempo: {
    url: "https://www.tempo.co/tag/mrt-jakarta",
    articleSelector: ".card-box.ft240",
    titleSelector: "h2, .title",
    dateSelector: ".date",
    linkSelector: "a",
    imageSelector: "img",
  },
};

export default scrapingConfigs;
