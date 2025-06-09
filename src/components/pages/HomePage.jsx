import React from 'react';
import CategorySidebar from '@/components/organisms/CategorySidebar';
import MainFeature from '@/components/organisms/MainFeature';

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row flex-1">
      <CategorySidebar />
      <MainFeature />
    </div>
  );
};

export default HomePage;