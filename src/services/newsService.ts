import {Article} from '../types';
import {FetchArticlesParams} from '../types';

export const fetchFromNewsAPI = async (
  params: FetchArticlesParams = {}
): Promise<Article[]> => {
  const {
    keyword = 'tesla',
    fromDate = '',
    toDate = '',
    category = '',
    source = '',
  } = params;
  const url = `https://newsapi.org/v2/top-headlines?q=${keyword}&from=${fromDate}&to=${toDate}&category=business&apiKey=e8d3b88e6cf44c488ec0770cf4154d96`;
  const response = await fetch(url);
  const data = await response.json();

  return data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
  }));
};

export const fetchFromGuardianAPI = async (
  params: FetchArticlesParams = {}
): Promise<Article[]> => {
  const {keyword = 'debates'} = params;
  const url = `https://content.guardianapis.com/search?q=${keyword}&tag=business/business&api-key=5f263435-e85b-4874-86b9-13061dddc906`;
  const response = await fetch(url);
  const data = await response.json();

  return data.response.results.map((article: any) => ({
    title: article.webTitle,
    description: article.webTitle,
    url: article.webUrl,
    imageUrl: '',
    source: 'The Guardian',
    publishedAt: article.webPublicationDate,
  }));
};

export const fetchFromNYTimesAPI = async (
  params: FetchArticlesParams = {}
): Promise<Article[]> => {
  const {keyword = 'election'} = params;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&section_name=''&api-key=u8p3wzInTPV9UGEe7VmgQeX5h75vFEGV`;
  const response = await fetch(url);
  const data = await response.json();

  return data.response.docs.map((article: any) => ({
    title: article.abstract,
    description: article.lead_paragraph,
    url: article.web_url,
    imageUrl: article.multimedia.length
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : '',
    source: 'The New York Times',
    publishedAt: article.pub_date,
  }));
};

export const fetchGurdianTags = async () => {
  try {
    const url =
      'https://content.guardianapis.com/sections?api-key=5f263435-e85b-4874-86b9-13061dddc906';
    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);
    return data.response.results.map((x: any) => {
      return {value: x.id, label: x.id};
    });
  } catch (error) {}
};
