import React from 'react';
import { Search } from './Search';
import { MenuList } from './MenuList';

export function Sider() {
  return (
    <aside className="w-80 bg-white border-r border-gray-100 flex flex-col overflow-hidden">
      {/* <Search /> */}
      <MenuList />
    </aside>
  );
}