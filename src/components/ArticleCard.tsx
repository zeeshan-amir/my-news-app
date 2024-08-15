import React from 'react';
import {Article} from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({article}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
      <div className="h-48 flex items-center justify-center bg-gray-100">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img src="./public/assets/no-image-found.svg" alt="No Image found" />
        )}
      </div>
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{article.description}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">
            {article.source} -{' '}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
