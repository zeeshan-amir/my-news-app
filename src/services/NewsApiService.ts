import {FetchArticlesParams} from '../types';
import {NEWS_API_KEY} from '../apiKeys';
import { PAGE_SIZE } from '../utils/const-string';
import { toast } from 'react-toastify';

class NewsApiService {
  async fetchFromNewsAPI(params: FetchArticlesParams) {
    const {keyword = 'tesla', fromDate = '', toDate = '', category, page = 1} = params;
    const endpoint =
      `https://newsapi.org/v2/top-headlines?q=${keyword}` +
      (fromDate ? `&from=${fromDate}` : '') +
      (toDate ? `&to=${toDate}` : '') +
      (category?.value ? `&category=${category?.value}` : '') +
      '&country=us' +
      (params?.author ? `&author=${params?.author}` : '') + 
      `&pageSize=${PAGE_SIZE}` +
      `&page=${page}` +
      `&apiKey=${NEWS_API_KEY}`;

    const response = await fetch(endpoint);
    const json = await response.json();
    if(response.status === 429){
      toast.error('Too many requests')
    }
    if(response.status === 426){
    return {
      totalRecordsNewsApi: json.totalResults,
      recordsNewsApi:json.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
    }))};
  }
  return {
    totalRecordsNewsApi: 0,
    recordsNewsApi:[]

  }
  }
}

export default new NewsApiService();
