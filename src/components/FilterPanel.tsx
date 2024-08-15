import React, {useState, useEffect} from 'react';
import Button from './Buttons/Button';
import Input from './Inputs/CustomInput';
import CustomSelect from './Inputs/CustomSelect';
import useCategories from '../hooks/useCategories';
import {optionsForSources} from '../utils/sources';
import {MultiValue, SingleValue} from 'react-select';
import preferencesStorageService from '../services/localStorage';
import {ConfigurationState, Option} from '../types';

interface FilterPanelProps {
  onFilter: (filters: {
    fromDate?: string;
    toDate?: string;
    category?: Option;
    source?: Option[];
    author: string;
  }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({onFilter}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const savedPreferences: ConfigurationState =
    preferencesStorageService.get<ConfigurationState>() as ConfigurationState;

  const {
    sources,
    categories,
    availableCategories,
    handleSourcesChange,
    handleCategoriesChange,
  } = useCategories(savedPreferences?.sources as Option[], savedPreferences?.categories as Option);

  useEffect(() => {
    if (savedPreferences?.categories)
      handleCategoriesChange(
        savedPreferences.categories as SingleValue<Option>
      );
    if (savedPreferences?.sources)
      handleSourcesChange(savedPreferences.sources as MultiValue<Option>);
  }, [savedPreferences]);

  const handleFilter = () => {
    onFilter({
      fromDate,
      toDate,
      category: categories as Option,
      source: sources as Option[],
      author: '',
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
      <Input
        type="date"
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
        className="mb-2 md:mb-0 p-2 border border-gray-300 rounded"
        placeholder="From Date"
      />
      <Input
        type="date"
        value={toDate}
        onChange={e => setToDate(e.target.value)}
        className="mb-2 md:mb-0 p-2 border border-gray-300 rounded"
        placeholder="To Date"
      />
      <CustomSelect
        options={availableCategories}
        value={categories}
        onChange={selectedOption =>
          handleCategoriesChange(selectedOption as SingleValue<Option> | null)
        }
        placeholder="Select Category"
        isClearable
        isDisabled={!sources.length}
        className="mb-2 md:mb-0 p-2 border border-gray-300 rounded"
      />
      <CustomSelect
        options={optionsForSources}
        value={sources}
        onChange={selectedOption =>
          handleSourcesChange(selectedOption as MultiValue<Option> | null)
        }
        placeholder="Select Sources"
        isClearable
        isMulti
        className="mb-2 md:mb-0 p-2 border border-gray-300 rounded"
        isDisabled={savedPreferences?.sources?.length > 0}
      />
      <Button
        onClick={handleFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
