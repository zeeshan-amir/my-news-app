import React, {useState, useEffect} from 'react';
import CustomSelect from '../components/Inputs/CustomSelect';
import {MultiValue, SingleValue} from 'react-select';
import {toast} from 'react-toastify';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/CustomInput';
import useCategories from '../hooks/useCategories';
import {optionsForSources} from '../utils/sources';
import preferencesStorageService from '../services/localStorage';
import {ConfigurationState, Option} from '../types';

const Preferences: React.FC = () => {
  const [authors, setAuthors] = useState<string>('');

  const {
    sources,
    categories,
    availableCategories,
    handleSourcesChange,
    handleCategoriesChange,
  } = useCategories();

  useEffect(() => {
    const storedPreferences =
      preferencesStorageService.get<ConfigurationState>();
    if (storedPreferences) {
      handleSourcesChange(storedPreferences?.sources as Option[]);
      handleCategoriesChange(storedPreferences?.categories as Option);
      setAuthors(authors || '');
    }
  }, []);

  const savePreferences = () => {
    const payload: ConfigurationState = {
      sources: [...sources],
      categories: categories as Option,
      author: authors,
    };
    preferencesStorageService.set<ConfigurationState>(payload);
    toast.success('Preferences Saved Successfully');
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Customize Your News Feed
      </h1>

      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg font-semibold mb-2">Sources</h2>
        <CustomSelect
          options={optionsForSources}
          value={sources}
          onChange={selectedOption =>
            handleSourcesChange(selectedOption as MultiValue<Option> | null)
          }
          placeholder="Select Sources"
          isClearable
          isMulti
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <CustomSelect
          options={availableCategories}
          value={categories?.label ? categories : null}
          onChange={selectedOption =>
            handleCategoriesChange(selectedOption as SingleValue<Option> | null)
          }
          placeholder="Select category"
          isClearable
          isDisabled={!sources.length}
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg font-semibold mb-2">Authors</h2>
        <Input
          type="text"
          placeholder="Enter authors"
          value={authors}
          onChange={e => setAuthors(e.target.value)}
          className="w-full p-2 sm:p-3 mb-2 border border-gray-300 rounded-lg"
        />
      </div>

      <Button
        onClick={savePreferences}
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Save Preferences
      </Button>
    </div>
  );
};

export default Preferences;
