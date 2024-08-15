import {useState, useEffect} from 'react';
import {MultiValue, SingleValue} from 'react-select';
import {newYorkselectOptions, newsApiSelectOptions} from '../utils/categories';
import spinnerSvc from '../utils/loader-service';
import GurdianApiService from '../services/GurdianApiService';
import {Option} from '../types';

type SourceKey = 'The-News-Api' | 'New-York-Api' | 'Gurdian-Api';

const useCategories = (
  initialSources: MultiValue<Option> = [],
  initialCategory: SingleValue<Option> | null = null
) => {
  const [sources, setSources] = useState<MultiValue<Option>>(initialSources);
  const [categories, setCategories] = useState<SingleValue<Option> | null>(initialCategory);
  const [availableCategories, setAvailableCategories] = useState<Option[]>([]);
  const [sourceToCategoriesMap, setSourceToCategoriesMap] = useState<Record<SourceKey, Option[]>>({
    'The-News-Api': newsApiSelectOptions,
    'New-York-Api': newYorkselectOptions,
    'Gurdian-Api': [],
  });

  const fetchGurdianCategories = async () => {
    try {
      spinnerSvc.start();
      const res = await GurdianApiService.fetchGuardianTags();
      setSourceToCategoriesMap(prevMap => ({
        ...prevMap,
        'Gurdian-Api': res,
      }));
    } catch (error) {
      console.error('Error fetching Guardian categories:', error);
    } finally {
      spinnerSvc.stop();
    }
  };

  useEffect(() => {
    fetchGurdianCategories();
  }, []); 

  useEffect(() => {
    const selectedSource = sources.map(x => x.value) as SourceKey[];
    const options = selectedSource.map(x => sourceToCategoriesMap[x] || []);
    const newAvailableCategories = options.flatMap(x => x);
    
    if (newAvailableCategories !== availableCategories) {
      setAvailableCategories(newAvailableCategories);
    }

    const included = newAvailableCategories.find(
      y => y.label === categories?.label && y.value === categories?.value
    );

    if (included && categories !== included) {
      setCategories(included);
    }
  }, [sources, sourceToCategoriesMap]); 

  const handleSourcesChange = (selectedOptions: MultiValue<Option> | null) => {
    setSources(selectedOptions as Option[]);
  };

  const handleCategoriesChange = (selectedOption: SingleValue<Option> | null) => {
    setCategories(selectedOption as Option);
  };

  return {
    sources,
    categories,
    availableCategories,
    sourceToCategoriesMap,
    handleSourcesChange,
    handleCategoriesChange,
  };
};

export default useCategories;
