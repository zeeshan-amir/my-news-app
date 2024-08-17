import React, { useEffect, useRef } from 'react';
import {Article} from '../types';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[]
}

const ArticleList: React.FC<ArticleListProps> = ({articles}) => {

  const scrollableRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    scrollableRef.current?.scrollTo(0,0)
  },[articles])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" ref={scrollableRef}>
      {articles?.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
