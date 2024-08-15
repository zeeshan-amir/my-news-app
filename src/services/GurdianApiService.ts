import ApiService from './ApiService';
import {FetchArticlesParams} from '../types';
import {GUARDIAN_API_KEY} from '../apiKeys';

class GuardianApiService extends ApiService {
  constructor() {
    super('http://content.guardianapis.com');
  }

  async fetchArticles(params: FetchArticlesParams = {}) {
    const {keyword = 'debates'} = params;
    const endpoint = `/search?q=${keyword}${params?.category ? `&tag=${params.category.value}` : ''}&from-date=${params.fromDate}&api-key=${GUARDIAN_API_KEY}`;
    const response = await this.get<{response: {results: any[]}}>(endpoint);
    return response.response.results.map((article: any) => ({
      title: article.webTitle,
      description: article.webTitle,
      url: article.webUrl,
      imageUrl: '',
      source: 'The Guardian',
      publishedAt: article.webPublicationDate,
    }));
  }

  async fetchGuardianTags() {
    const endpoint = `/tags?api-key=${GUARDIAN_API_KEY}`;
    const response = await this.get<{response: {results: any[]}}>(endpoint);
    console.log('res', response);
    return response.response.results.map((x: any) => ({
      value: x.id,
      label: x.id,
    }));
  }
}

export default new GuardianApiService();