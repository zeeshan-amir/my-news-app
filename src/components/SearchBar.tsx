import React from 'react';
import Button from './Buttons/Button';
import Input from './Inputs/CustomInput';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  search: string;
  setSearch: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch, setSearch, search}) => {
  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="flex mb-4 gap-4">
      <Input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search articles..."
        className="flex-grow p-2 border border-gray-300 rounded-l-lg"
      />
      <Button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
