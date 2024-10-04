import Pagination from '@/Components/Pagination';
import SearchFilter from '@/Components/SearchFilter';
import SecondaryButton from '@/Components/SecondaryButton';
import Layout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { ArchiveRestoreIcon, EditIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import React from 'react';

const IndexBazar = ({}) => {

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Bazar</h1>
     
      <div className=" bg-white">
      <a className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150" href={route('bazar-export')}>Descargar</a>
      </div>
    </div>
  );
};

IndexBazar.layout = page => <Layout title="Bazar" children={page} />;

export default IndexBazar;
