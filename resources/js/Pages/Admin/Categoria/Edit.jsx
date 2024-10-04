import DeleteButton from "@/Components/DeleteButton";
import LoadingButton from "@/Components/LoadingButton";
import TrashedMessage from "@/Components/TrashedMessage";
import Layout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import RestoreButton from "@/Components/RestoreButton";

const EditCategoria = () => {
    const { categoria } = usePage().props;

    const { data, setData, errors, put, processing, recentlySuccessful } =
        useForm({
            nombre: categoria.data.nombre || "",
        });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("categorias.update", categoria.data.id));
    }

    function destroy() {
        if (confirm("Estas seguro que deseas eliminar este registro?")) {
            router.delete(route("categorias.destroy", categoria.data.id));
        }
    }

    function restore() {
        if (confirm("Estas seguro que deseas restaurar este registro ?")) {
            router.put(route("categorias.restore", categoria.data.id));
        }
    }

    return (
        <div className="max-w-xl">
            <Head title={data.nombre} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("categorias")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Categorias
                </Link>
                <span className="mx-2 font-medium text-amber-600">/</span>
                {data.nombre}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar categoria
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="nombre" value="Nombre" />

                            <TextInput
                                id="nombre"
                                className="mt-1 block w-full"
                                value={data.nombre}
                                onChange={(e) =>
                                    setData("nombre", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="nombre"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.nombre}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Guardar
                            </PrimaryButton>

                            {!categoria.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {categoria.data.deleted_at && (
                                <RestoreButton onRestore={restore}>
                                    Restaurar
                                </RestoreButton>
                            )}

                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out"
                            >
                                <p className="text-sm text-gray-600">
                                    Guardado.
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

EditCategoria.layout = (page) => <Layout children={page} />;

export default EditCategoria;
