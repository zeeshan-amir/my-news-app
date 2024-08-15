import ApiService from './ApiService';
import {FetchArticlesParams} from '../types';
import {NYTIMES_API_KEY} from '../apiKeys';

class NYTimesApiService extends ApiService {
  constructor() {
    super('https://api.nytimes.com/svc/search/v2');
  }

  async fetchArticles(params: FetchArticlesParams = {}) {
    const {keyword, category, fromDate, toDate} = params;
    const endpoint: string =
      `/articlesearch.json?q=${keyword}` +
      (category?.value ? `&category=${category.value}` : '') +
      (fromDate ? `&begin_date=${fromDate.replace(/-/g, '')}` : '') +
      (toDate ? `&end_date=${toDate.replace(/-/g, '')}` : '') +
      `&api-key=${NYTIMES_API_KEY}`;

    const response = await this.get<{response: {docs: any[]}}>(endpoint);
    return response.response.docs.map((article: any) => ({
      title: article.abstract,
      description: article.lead_paragraph,
      url: article.web_url,
      imageUrl: article.multimedia.length
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : '',
      source: 'The New York Times',
      publishedAt: article.pub_date,
    }));
  }
}

export default new NYTimesApiService();
