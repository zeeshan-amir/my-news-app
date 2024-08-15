import {FetchArticlesParams} from '../types';
import {NEWS_API_KEY} from '../apiKeys';

class NewsApiService {
  async fetchFromNewsAPI(params: FetchArticlesParams = {}) {
    const {keyword = 'tesla', fromDate = '', toDate = '', category} = params;
    const endpoint =
    `https://newsapi.org/v2/top-headlines?q=${keyword}` +
    (fromDate ? `&from=${fromDate}` : '') +
    (toDate ? `&to=${toDate}` : '') +
    (category?.value ? `&category=${category?.value}` : '') +
    '&country=us' +
    (params?.author ? `&author=${params?.author}` : '') + 
    `&apiKey=${NEWS_API_KEY}`;

    const response = await fetch(endpoint);
    const json = await response.json();
    return json.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
    }));
  }
}

export default new NewsApiService();
