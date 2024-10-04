import Pagination from "@/Components/Pagination";
import SearchFilter from "@/Components/SearchFilter";
import SecondaryButton from "@/Components/SecondaryButton";
import Layout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import {
    ArchiveRestoreIcon,
    Check,
    EditIcon,
    Trash2Icon,
    TrashIcon,
} from "lucide-react";
import React from "react";

const IndexIdentidadCultural = ({identidad_cultural}) => {
    console.log(identidad_cultural);
    const {
        data,
        meta: { links },
    } = identidad_cultural;
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Identidad cultural</h1>
            <div className="flex items-center justify-between mb-6">
                <SearchFilter />
                <Link
                    className="btn-amber focus:outline-none"
                    href={route("identidad-cultural.create")}
                >
                    <SecondaryButton>
                        <span>Nuevo</span>
                        <span className="hidden md:inline ml-1">Identidad Cultural</span>
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
                        {data.map(({ id, nombre, deleted_at,validado }) => {
                            return (
                                <tr
                                    key={id}
                                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                                >
                                    <td className="border-t">
                                        <Link
                                            href={route("identidad-cultural.edit", id)}
                                            className="flex items-center px-6 py-4 focus:text-amber-700 focus:outline-none"
                                        >
                                            {nombre}
                                            {deleted_at && (
                                                <TrashIcon className="ml-2" />
                                            )}
                                            {validado && (
                                                <Check className="ml-2 text-green-600" />
                                            )}
                                        </Link>
                                    </td>
                                    <td className="w-px border-t">
                                        <Link
                                            tabIndex="-1"
                                            href={route("identidad-cultural.edit", id)}
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

IndexIdentidadCultural.layout = (page) => <Layout title="IdentidadCultural" children={page} />;

export default IndexIdentidadCultural;
