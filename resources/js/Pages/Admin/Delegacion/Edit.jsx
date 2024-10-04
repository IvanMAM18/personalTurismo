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
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useEffect } from "react";

const EditDelegacion = ({delegaciones}) => {
    const { delegacion } = usePage().props;
    console.log(delegacion);
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            nombre: delegacion.data.nombre || "",
            leyenda: delegacion.data.leyenda || "",
            descripcion: delegacion.data.descripcion || "",
            id_delegacion_padre: delegacion.data.id_delegacion_padre || null,
            cover: null,
            principal: null,
            _method: "put",
        });
        const [selectedDelegacion, setSelectedDelegacion] = useState(data.id_delegacion_padre || null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("delegaciones.update", delegacion.data.id));
    }
    useEffect(() => {
        if (!selectedDelegacion) return

        setData("id_delegacion_padre", selectedDelegacion);
    }, [selectedDelegacion]);

    function destroy() {
        if (confirm("Estas seguro que deseas eliminar este registro?")) {
            router.delete(route("delegaciones.destroy", delegacion.data.id));
        }
    }

    function restore() {
        if (confirm("Estas seguro que deseas restaurar este registro ?")) {
            router.put(route("delegaciones.restore", delegacion.data.id));
        }
    }

    return (
        <div className="max-w-xl">
            <Head title={delegacion.data.nombre} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("delegaciones")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Delegaciones
                </Link>
                <span className="mx-2 font-medium text-amber-600">/</span>
                {delegacion.data.nombre}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar delegacion
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="nombre" value="Titulo" />

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
                        <div>
                            <InputLabel htmlFor="leyenda" value="Enlace" />

                            <TextInput
                                id="leyenda"
                                className="mt-1 block w-full"
                                value={data.leyenda}
                                onChange={(e) =>
                                    setData("leyenda", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.leyenda}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="descripcion"
                                value="Descripcion"
                            />

                            <TextInput
                                id="descripcion"
                                className="mt-1 block w-full"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.descripcion}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="id_delegacion_padre"
                                value="Delegacion"
                            />

                            <Dropdown
                                name="id_delegacion_padre"
                                id="id_delegacion_padre"
                                value={selectedDelegacion}
                                onChange={(e) => setSelectedDelegacion(e.value)}
                                options={delegaciones}
                                optionLabel="nombre"
                                optionValue="id"
                                placeholder="Seleccionar una delegacion"
                                className="w-full md:w-14rem"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.id_delegacion_padre}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="cover" value="Cover" />
                            {delegacion.data.cover && (
                                <img
                                    className="block w-[300px] h-[200px]"
                                    src={delegacion.data.cover}
                                />
                            )}
                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="cover"
                                 accept="image/*"
                                errors={errors.cover}
                                value={data.cover}
                                onChange={(photo) => setData("cover", photo)}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.cover}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="principal" value="Principal" />
                            {delegacion.data.principal && (
                                <img
                                    className="block w-[200px] h-[200px]"
                                    src={delegacion.data.principal}
                                />
                            )}
                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="principal"
                                 accept="image/*"
                                errors={errors.principal}
                                value={data.principal}
                                onChange={(photo) => setData("principal", photo)}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.principal}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Guardar
                            </PrimaryButton>

                            {!delegacion.data.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {delegacion.data.deleted_at && (
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

EditDelegacion.layout = (page) => <Layout children={page} />;

export default EditDelegacion;
