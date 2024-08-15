export const nyCategories = [
  'Arts',
  'Automobiles',
  'Autos',
  'Blogs',
  'Books',
  'Booming',
  'Business',
  'Business Day',
  'Corrections',
  'Crosswords & Games',
  'Crosswords/Games',
  'Dining & Wine',
  'Dining and Wine',
  "Editors' Notes",
  'Education',
  'Fashion & Style',
  'Food',
  'Front Page',
  'Giving',
  'Global Home',
  'Great Homes & Destinations',
  'Great Homes and Destinations',
  'Health',
  'Home & Garden',
  'Home and Garden',
  'International Home',
  'Job Market',
  'Learning',
  'Magazine',
  'Movies',
  'Multimedia',
  'Multimedia/Photos',
  'N.Y. / Region',
  'N.Y./Region',
  'NYRegion',
  'NYT Now',
  'National',
  'New York',
  'New York and Region',
  'Obituaries',
  'Olympics',
  'Open',
  'Opinion',
  'Paid Death Notices',
  'Public Editor',
  'Real Estate',
  'Science',
  'Sports',
  'Style',
  'Sunday Magazine',
  'Sunday Review',
  'T Magazine',
  'T:Style',
  'Technology',
  'The Public Editor',
  'The Upshot',
  'Theater',
  'Times Topics',
  'TimesMachine',
  "Today's Headlines",
  'Topics',
  'Travel',
  'U.S.',
  'Universal',
  'UrbanEye',
  'Washington',
  'Week in Review',
  'World',
  'Your Money',
];

export const newYorkselectOptions = nyCategories.map(category => {
  return {
    label: category,
    value: category,
  };
});

export const newsApiCategory: string[] = [
  'business',
  'entertainment',
  'general',
  'healthscience',
  'sports',
  'technology',
];

export const newsApiSelectOptions = newsApiCategory.map(x => {
  return {
    label: x,
    value: x,
  };
});
