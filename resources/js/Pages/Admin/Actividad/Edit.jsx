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
import FileInput from "@/Components/FileInput";

const Edit = () => {
    const { actividad } = usePage().props;
console.log(actividad);
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            nombre: actividad.data.nombre || "",
            icono: "",
            _method: "put",
        });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("actividades.update", actividad.data.id));
    }

    function destroy() {
        if (confirm("Estas seguro que deseas eliminar este registro?")) {
            router.delete(route("actividades.destroy", actividad.data.id));
        }
    }

    function restore() {
        if (confirm("Estas seguro que deseas restaurar este registro ?")) {
            router.put(route("actividades.restore", actividad.data.id));
        }
    }

    return (
        <div className="max-w-xl">
            <Head title={actividad.data.nombre} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("actividades")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Servicios
                </Link>
                <span className="mx-2 font-medium text-amber-600">/</span>
                {actividad.data.nombre}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar actividad
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
                        <div></div>
                        <div>
                            <InputLabel htmlFor="icono" value="Icono" />
                            {actividad.data.icono && (
                                <img
                                    className="block w-[50px] h-[50px]"
                                    src={actividad.data.icono}
                                />
                            )}
                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="icono"
                                accept="image/*"
                                errors={errors.icono}
                                value={data.icono}
                                onChange={(photo) => setData("icono", photo)}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.icono}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Guardar
                            </PrimaryButton>

                            {!actividad.data.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {actividad.data.deleted_at && (
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

Edit.layout = (page) => <Layout children={page} />;

export default Edit;
