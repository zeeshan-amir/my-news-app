export interface Article {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
}

export interface FetchArticlesParams {
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  category?: Option;
  source?: Option[];
  author?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface ConfigurationState {
  sources: Option[];
  categories: Option;
  author: string;
}
