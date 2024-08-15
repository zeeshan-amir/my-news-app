import React, {useState, useEffect} from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import {FetchArticlesParams, Article, ConfigurationState} from '../types';
import NewsApiService from '../services/NewsApiService';
import GurdianApiService from '../services/GurdianApiService';
import NYTimesService from '../services/NYTimesService';
import useDebounce from '../hooks/useDounce';
import spinnerSvc from '../utils/loader-service';
import preferencesStorageService from '../services/localStorage';
import useCategories from '../hooks/useCategories';
import {Option} from '../types';
const Home: React.FC = () => {
  const preferences: ConfigurationState | null =
    preferencesStorageService.get<ConfigurationState>();

  const [filters, setFilters] = useState<FetchArticlesParams>(
    preferences
      ? {
          category: preferences.categories,
          source: preferences.sources,
          author: preferences.author,
        }
      : ({
          keyword: '',
          fromDate: '',
          toDate: '',
          category: {label: '', value: ''} as Option,
          source: [] as Option[],
        } as FetchArticlesParams)
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState<string>('');
  const debouncedKeyword = useDebounce(search || '', 500);
  const {sourceToCategoriesMap} = useCategories();

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
  };

  const handleFilter = (filterParams: FetchArticlesParams) => {
    setFilters(prevFilters => ({...prevFilters, ...filterParams}));
  };
  const isCategoryValidForSource = (source: string, category: string) => {
    const validCategories =
      sourceToCategoriesMap[source as keyof typeof sourceToCategoriesMap] || [];
    console.log('valid', validCategories);
    return validCategories.some(cat => cat.value === category);
  };
  const fetchArticles = async () => {
    try {
      spinnerSvc.start();

      let guardianArticles: Article[] = [];
      let nyTimesArticles: Article[] = [];
      let newsAPIArticles: Article[] = [];

      const isValidForNewsApi = isCategoryValidForSource(
        'The-News-Api',
        filters?.category?.value as string
      );
      const filtersForNewsApi = {...filters};
      if (!isValidForNewsApi) delete filtersForNewsApi?.category;

      const isValidForGurdianApi = isCategoryValidForSource(
        'Gurdian-Api',
        filters?.category?.value as string
      );
      const filtersForGurdianApi = {...filters};
      if (!isValidForGurdianApi) delete filtersForGurdianApi?.category;

      const isValidForNewYorkApi = isCategoryValidForSource(
        'New-York-Api',
        filters?.category?.value as string
      );
      const filtersForNewYorkApi = {...filters};
      if (!isValidForNewYorkApi) delete filtersForNewYorkApi?.category;

      if (filters?.source?.length! > 0) {
        const sources = filters?.source?.map(source => source.label) || [];
        if (sources.includes('The News Api')) {
          // const isValid = isCategoryValidForSource('The-News-Api', filters?.category?.value as string);
          // let filtersForApi = {...filters}
          // if(!isValid) delete filtersForApi.category
          // console.log('isValid',isValid)
          newsAPIArticles = await NewsApiService.fetchFromNewsAPI({
            ...filtersForNewsApi,
            keyword: debouncedKeyword,
          });
        }

        if (sources.includes('Gurdian Api')) {
          // const isValid = isCategoryValidForSource('Gurdian-Api', filters?.category?.value as string);
          // let filtersForApi = {...filters}
          // if(!isValid) delete filtersForApi.category
          // console.log('isValid',isValid)

          guardianArticles = await GurdianApiService.fetchArticles({
            ...filtersForGurdianApi,
            keyword: debouncedKeyword,
          });
        }

        if (sources.includes('New York Api')) {
          // const isValid = isCategoryValidForSource('New-York-Api', filters?.category?.value as string);
          // let filtersForApi = {...filters}
          // if(!isValid) delete filtersForApi.category
          // console.log('isValid',isValid)

          nyTimesArticles = await NYTimesService.fetchArticles({
            ...filtersForNewYorkApi,
            keyword: debouncedKeyword,
          });
        }
      } else {
        newsAPIArticles = await NewsApiService.fetchFromNewsAPI({
          ...filtersForNewYorkApi,
          keyword: debouncedKeyword,
        });
        guardianArticles = await GurdianApiService.fetchArticles({
          ...filtersForGurdianApi,
          keyword: debouncedKeyword,
        });
        nyTimesArticles = await NYTimesService.fetchArticles({
          ...filtersForNewYorkApi,
          keyword: debouncedKeyword,
        });
      }
      console.log('gur', guardianArticles);

      setArticles([
        ...newsAPIArticles,
        ...guardianArticles,
        ...nyTimesArticles,
      ]);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      spinnerSvc.stop();
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filters]);

  useEffect(() => {
    fetchArticles();
  }, [debouncedKeyword]);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Top Headlines
      </h1>
      <SearchBar
        onSearch={handleSearch}
        setSearch={setSearch}
        search={search}
      />
      <FilterPanel onFilter={handleFilter} />
      <ArticleList articles={articles} />
    </div>
  );
};

export default Home;
