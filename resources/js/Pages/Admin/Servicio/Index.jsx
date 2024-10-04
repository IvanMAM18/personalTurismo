import Pagination from "@/Components/Pagination";
import SearchFilter from "@/Components/SearchFilter";
import SecondaryButton from "@/Components/SecondaryButton";
import Layout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import {
    ArchiveRestoreIcon,
    EditIcon,
    Trash2Icon,
    TrashIcon,
} from "lucide-react";
import React from "react";

const Index = () => {
    const { servicios } = usePage().props;

    const {
        data,
        meta: { links },
    } = servicios;
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Servicios</h1>
            <div className="flex items-center justify-between mb-6">
                <SearchFilter />
                <Link
                    className="btn-amber focus:outline-none"
                    href={route("servicios.create")}
                >
                    <SecondaryButton>
                        <span>Nuevo</span>
                        <span className="hidden md:inline ml-1">Servicio</span>
                    </SecondaryButton>
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="font-bold text-left">
                            <th className="px-6 pt-5 pb-4">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ id, nombre, deleted_at }) => {
                            return (
                                <tr
                                    key={id}
                                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                                >
                                    <td className="border-t">
                                        <Link
                                            href={route("servicios.edit", id)}
                                            className="flex items-center px-6 py-4 focus:text-amber-700 focus:outline-none"
                                        >
                                            {nombre}
                                            {deleted_at && (
                                                <TrashIcon className="ml-2" />
                                            )}
                                        </Link>
                                    </td>
                                    <td className="w-px border-t">
                                        <Link
                                            tabIndex="-1"
                                            href={route("servicios.edit", id)}
                                            className="flex items-center px-4 focus:outline-none"
                                        >
                                            <EditIcon />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                        {data.length === 0 && (
                            <tr>
                                <td className="px-6 py-4 border-t" colSpan="4">
                                    No se encontraron registros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination links={links} />
        </div>
    );
};

Index.layout = (page) => <Layout title="Servicios" children={page} />;

export default Index;
