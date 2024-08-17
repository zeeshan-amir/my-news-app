import React, {useState, useEffect} from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/pagination';
import {FetchArticlesParams, Article, ConfigurationState} from '../types';
import NewsApiService from '../services/NewsApiService';
import GurdianApiService from '../services/GurdianApiService';
import NYTimesService from '../services/NYTimesService';
import useDebounce from '../hooks/useDebounce';
import spinnerSvc from '../utils/loader-service';
import preferencesStorageService from '../services/localStorage';
import useCategories from '../hooks/useCategories';
import {Option} from '../types';
import { PAGE_SIZE } from '../utils/const-string';

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
  const [totalRecordsLength,setTotalRecordsLength] = useState<number>(0)
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // New state for current page
  const debouncedKeyword = useDebounce(search || '', 500);
  const {sourceToCategoriesMap} = useCategories();

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    setCurrentPage(1); 
  };

  const handleFilter = (filterParams: FetchArticlesParams) => {
    setFilters(prevFilters => ({...prevFilters, ...filterParams}));
    setCurrentPage(1); 
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isCategoryValidForSource = (source: string, category: string) => {
    const validCategories =
      sourceToCategoriesMap[source as keyof typeof sourceToCategoriesMap] || [];
    return validCategories.some(cat => cat.value === category);
  };

  const fetchArticles = async () => {
    try {
      spinnerSvc.start();

      let guardianArticles: Article[] = [];
      let nyTimesArticles: Article[] = [];
      let newsAPIArticles: Article[] = [];

      let guardianArticlesLength : number = 0;
      let nyTimesArticlesLength : number = 0;
      let newsAPIArticlesLength : number = 0;

      const isValidForNewsApi = isCategoryValidForSource(
        'The-News-Api',
        filters?.category?.value as string
      );
      const filtersForNewsApi = {...filters, page: currentPage};
      if (!isValidForNewsApi) delete filtersForNewsApi?.category;

      const isValidForGurdianApi = isCategoryValidForSource(
        'Gurdian-Api',
        filters?.category?.value as string
      );
      const filtersForGurdianApi = {...filters, page: currentPage};
      if (!isValidForGurdianApi) delete filtersForGurdianApi?.category;

      const isValidForNewYorkApi = isCategoryValidForSource(
        'New-York-Api',
        filters?.category?.value as string
      );
      const filtersForNewYorkApi = {...filters, page: currentPage};
      if (!isValidForNewYorkApi) delete filtersForNewYorkApi?.category;

      if (filters?.source?.length! > 0) {
        const sources = filters?.source?.map(source => source.label) || [];
        if (sources.includes('The News Api')) {
          const {totalRecordsNewsApi,recordsNewsApi} = await NewsApiService.fetchFromNewsAPI({
            ...filtersForNewsApi,
            keyword: debouncedKeyword,
          });
          newsAPIArticles = recordsNewsApi
          newsAPIArticlesLength = totalRecordsNewsApi
        }
        if (sources.includes('Gurdian Api')) {
          const {totalRecordsGurdianApi,recordsGurdianApi}  = await GurdianApiService.fetchArticles({
            ...filtersForGurdianApi,
            keyword: debouncedKeyword,
          });
          guardianArticles = recordsGurdianApi
          guardianArticlesLength = totalRecordsGurdianApi
        }

        if (sources.includes('New York Api')) {
          const {totalRecordsNytimeApi,recordsNytimeApi}  = await NYTimesService.fetchArticles({
            ...filtersForNewYorkApi,
            keyword: debouncedKeyword,
          })
          nyTimesArticles = recordsNytimeApi
          nyTimesArticlesLength = totalRecordsNytimeApi
        }
      } else {
        const {totalRecordsNewsApi,recordsNewsApi} = await NewsApiService.fetchFromNewsAPI({
          ...filtersForNewsApi,
          keyword: debouncedKeyword,
        });
        newsAPIArticles = recordsNewsApi
        newsAPIArticlesLength = totalRecordsNewsApi
        const {totalRecordsGurdianApi,recordsGurdianApi}  = await GurdianApiService.fetchArticles({
          ...filtersForGurdianApi,
          keyword: debouncedKeyword,
        });
        guardianArticles = recordsGurdianApi
        guardianArticlesLength = totalRecordsGurdianApi
        const {totalRecordsNytimeApi,recordsNytimeApi}  = await NYTimesService.fetchArticles({
          ...filtersForNewYorkApi,
          keyword: debouncedKeyword,
        });
        nyTimesArticles = recordsNytimeApi
        nyTimesArticlesLength = totalRecordsNytimeApi
      }
      const maxArticlesLength = Math.max(newsAPIArticlesLength, guardianArticlesLength, nyTimesArticlesLength);
      const totalPageCount = Math.ceil(maxArticlesLength / PAGE_SIZE);
      console.log('total',totalPageCount)
      setTotalRecordsLength(totalPageCount)
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
  }, [filters, currentPage]);

  useEffect(() => {
    fetchArticles();
  }, [debouncedKeyword]);

  return (
    <div className="container mx-auto p-4 sm:p-8" >
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalRecordsLength}
        onPageChange={handlePageChange}
      />{' '}
    </div>
  );
};

export default Home;
