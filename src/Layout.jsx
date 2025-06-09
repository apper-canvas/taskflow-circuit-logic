import { Outlet } from 'react-router-dom';

import CategorySidebar from '@/components/organisms/CategorySidebar';
import MainFeature from '@/components/organisms/MainFeature';

function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden max-w-full">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;