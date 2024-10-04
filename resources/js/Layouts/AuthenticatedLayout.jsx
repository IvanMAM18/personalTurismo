import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import TopHeader from '@/Components/TopHeader';
import BottomHeader from '@/Components/BottomHeader';
import MainMenu from '@/Components/MainMenu';
import FlashMessages from '@/Components/FlashMessages';

export default function Layout({ title, children }) {
  return (
    <div>
      <Head title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <TopHeader />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <MainMenu className="flex-shrink-0 hidden w-56 p-12 overflow-y-auto bg-orange-800 md:block" />
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12">
              <FlashMessages />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}