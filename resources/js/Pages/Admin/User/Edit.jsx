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
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useEffect } from "react";

const EditUser = ({user, roles}) => {

    const { data, setData, errors, put, processing, recentlySuccessful } =
        useForm({
            name: user.data.name || "",
            email: user.data.email || "",
            role: user.data.role || "",
        });

        const [selectedRole, setSelectedRole] = useState(user.data.role);

        useEffect(() => {
            if (!selectedRole) return;
            setData("role", selectedRole);
        }, [selectedRole]);
    

    function handleSubmit(e) {
        e.preventDefault();
        put(route("users.update", user.data.id));
    }

    function destroy() {
        if (confirm("Estas seguro que deseas eliminar este registro?")) {
            router.delete(route("users.destroy", user.data.id));
        }
    }

    function restore() {
        if (confirm("Estas seguro que deseas restaurar este registro ?")) {
            router.put(route("users.restore", user.data.id));
        }
    }

    return (
        <div className="max-w-xl">
            <Head title={data.nombre} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("users")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Usuarios
                </Link>
                <span className="mx-2 font-medium text-amber-600">/</span>
                {data.name}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar usuario
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                            <InputLabel htmlFor="name" value="Nombre" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="email"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                className="mt-1 block w-full"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type="password"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.password}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="role" value="Rol" />

                            <Dropdown
                                name="role"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.value)}
                                options={roles}
                                placeholder="Seleccionar un rol"
                                className="w-full md:w-14rem"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.role}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Guardar
                            </PrimaryButton>

                            {!user.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {user.data.deleted_at && (
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

EditUser.layout = (page) => <Layout children={page} />;

export default EditUser;
