# News Aggregator Application Using React

This project is an implementation of a News Aggregator application using Reactjs (Typescript). This is the only front End Application where we have integrated it with 3 Open News api sources.

## APi Sources
  Following API sources for the news are being used.
  
  - News Api (https://newsapi.org/)
  - Guardian Api (https://open-platform.theguardian.com/documentation/)
  - NewYork Api (https://developer.nytimes.com/docs/articlesearch-product/1/overview)

## Requirements
  - You should have a docker installed on your system.

## Features

- **Searching**: Searching based on anything matched with the news article .
- **Filtering**: Filteration of News based on news source, category and date.
- **Pages**
    - Home Page
    - Preference Page (User can set preferences to be shown on Home Page when save)
- **Github Actions**: Eslint & Testing workflow is added.
- **Containerization**: Application is dockerized.

## Demo

Here is the screenshots demonstrating the application's functionality:
![alt text](image.png)


## Local Setup Guidelines

1. Clone the repository:
   ```bash
   git clone https://github.com/zeeshan-amir/my-news-app.git
   cd my-news-app
   ```

2. Install dependencies & run the app:
   ```bash
   docker build -t my-news-app .
   ```

3. If you don't have a docker installed 
   ```bash
    npm install
    npm run dev
   ```

## Test Cases

Test cases react are added and ran before the build.
  ```bash
  npm test
  ```

## Note

  - NewsApi is being used with fetch instead of axios due to some CORS policy issues.
  - APIs are not paid so there are some limitations like 'limited numbder of requests', 'Rate Limiting' etc. 
  - You can add your own api-keys in env file in order to make it work as you expected.

## Conclusion

This README provides all necessary information to get the project set up locally, run tests.
