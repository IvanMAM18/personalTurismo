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

const EditEvento = () => {
    const { evento } = usePage().props;
console.log(evento);
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            alt: evento.data.alt || "",
            enlace: evento.data.enlace || "",
            imagen: null,
            _method: "put",
        });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("eventos.update", evento.data.id));
    }

    function destroy() {
        if (confirm("Estas seguro que deseas eliminar este registro?")) {
            router.delete(route("eventos.destroy", evento.data.id));
        }
    }

    function restore() {
        if (confirm("Estas seguro que deseas restaurar este registro ?")) {
            router.put(route("eventos.restore", evento.data.id));
        }
    }

    return (
        <div className="max-w-xl">
            <Head title={evento.data.alt} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("eventos")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Eventos
                </Link>
                <span className="mx-2 font-medium text-amber-600">/</span>
                {evento.data.alt}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar evento
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                            <InputLabel htmlFor="alt" value="Titulo" />

                            <TextInput
                                id="alt"
                                className="mt-1 block w-full"
                                value={data.alt}
                                onChange={(e) =>
                                    setData("alt", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="alt"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.alt}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="enlace" value="Enlace" />

                            <TextInput
                                id="enlace"
                                className="mt-1 block w-full"
                                value={data.enlace}
                                onChange={(e) =>
                                    setData("enlace", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.enlace}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="imagen" value="Imagen" />
                            {evento.data.imagen && (
                                <img
                                    className="block w-[100px] h-[200px]"
                                    src={evento.data.imagen}
                                />
                            )}
                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="imagen"
                                 accept="image/*"
                                errors={errors.imagen}
                                value={data.imagen}
                                onChange={(photo) => setData("imagen", photo)}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.imagen}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Guardar
                            </PrimaryButton>

                            {!evento.data.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {evento.data.deleted_at && (
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

EditEvento.layout = (page) => <Layout children={page} />;

export default EditEvento;
