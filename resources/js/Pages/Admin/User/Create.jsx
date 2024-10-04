import React from "react";
import { Link, useForm } from "@inertiajs/react";
import LoadingButton from "@/Components/LoadingButton";
import Layout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useEffect } from "react";

const CreateUser = ({ roles }) => {
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            password: "",
            role: "",
        });

    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        if (!selectedRole) return;
        setData("role", selectedRole);
    }, [selectedRole]);


    function handleSubmit(e) {
        e.preventDefault();
        post(route("users.store"));
    }

    return (
        <div className="max-w-xl">
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("users")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Usuarios
                </Link>
                <span className="font-medium text-amber-600"> /</span> Nuevo
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Registrar usuario
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
                                required
                                isFocused
                                autoComplete="password"
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

CreateUser.layout = (page) => (
    <Layout title="Registrar usuario" children={page} />
);

export default CreateUser;
