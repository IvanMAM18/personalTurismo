import React, { useEffect, useState,useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import LoadingButton from "@/Components/LoadingButton";
import Layout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import FileInput from "@/Components/FileInput";
import TextArea from "@/Components/TextArea";
import SelectInput from "@/Components/SelectInput";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { InfoIcon, MapPinIcon, Trash, Upload } from "lucide-react";
import GoogleMapReact from "google-map-react";

const CreateIdentidadCultural = ({ delegaciones }) => {
    const { data, setData, errors, post, processing, recentlySuccessful,transform } =
        useForm({
            nombre: "",
            descripcion: "",
            historia: "",
            leyenda: "",
            recomendaciones: "",
            cover: null,
            principal: null,
            id_delegacion: null,
            fotos: null,
        });
    const [selectedDelegacion, setSelectedDelegacion] = useState(null);
    const [files, setFiles] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("identidad-cultural.store"));
    }

    useEffect(() => {
        if (!selectedDelegacion) return

        setData("id_delegacion", selectedDelegacion.id);
    }, [selectedDelegacion]);

    useEffect(() => {
        setData("fotos", files);
    }, [files]);


    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton } = options;
        const value = totalSize / 100000;
        const formatedValue =
            fileUploadRef && fileUploadRef.current
                ? fileUploadRef.current.formatSize(totalSize)
                : "0 B";

        return (
            <div
                className={className}
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {chooseButton}
                <div className="flex items-center gap-3 ml-auto">
                    <span>{formatedValue} / 10 MB</span>
                    <ProgressBar
                        value={value}
                        showValue={false}
                        style={{ width: "10rem", height: "12px" }}
                    ></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-4 w-9/12">
                    <img
                        alt={file.name}
                        role="presentation"
                        src={file.objectURL}
                        width={100}
                    />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small className="ml-2">
                            {new Date().toLocaleDateString()}
                        </small>
                    </span>
                </div>
                <Tag
                    value={props.formatSize}
                    severity="warning"
                    className="px-3 py-2"
                />
                <Button
                    type="button"
                    icon={<Trash></Trash>}
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex items-center flex-column">
                <span
                    style={{
                        fontSize: "1.2em",
                        color: "var(--text-color-secondary)",
                    }}
                    className="my-5"
                >
                    Arrastrar fotos aqui
                </span>
            </div>
        );
    };


    const chooseOptions = {
        icon: <Upload></Upload>,
        iconOnly: true,
        severity: "danger",
        className: "custom-choose-btn p-button-rounded p-button-outlined",
    };

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        //const file = event.files[0];
        console.log(event.files);
        setFiles(event.files);
    };

    return (
        <div className="w-full">
            <Toast ref={toast}></Toast>
            <Tooltip
                target=".custom-choose-btn"
                content="Seleccionar"
                position="bottom"
            />
            <Tooltip
                target=".button-delete"
                content="Eliminar"
                position="bottom"
            />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("identidad-cultural")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Identidad Cultural
                </Link>
                <span className="font-medium text-amber-600"> /</span> Nuevo
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Registrar identidad cultural
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
                                
                                autoComplete="nombre"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.nombre}
                            />
                        </div>
                       
                        <div>
                            <InputLabel
                                htmlFor="descripcion"
                                value="Descripcion"
                            />

                            <TextArea
                                id="descripcion"
                                className="mt-1 block w-full"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                                required
                                
                                autoComplete="descripcion"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.descripcion}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="historia" value="Historia" />

                            <TextArea
                                id="historia"
                                className="mt-1 block w-full"
                                value={data.historia}
                                onChange={(e) =>
                                    setData("historia", e.target.value)
                                }                                
                            />

                            <InputError
                                className="mt-2"
                                message={errors.historia}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="leyenda" value="leyenda" />

                            <TextArea
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
                                htmlFor="recomendaciones"
                                value="Recomendaciones"
                            />

                            <TextArea
                                id="recomendaciones"
                                className="mt-1 block w-full"
                                value={data.recomendaciones}
                                onChange={(e) =>
                                    setData("recomendaciones", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.recomendaciones}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="cover" value="Cover" />

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

                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="principal"
                                accept="image/*"
                                errors={errors.principal}
                                value={data.principal}
                                onChange={(photo) =>
                                    setData("principal", photo)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.principal}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="id_delegacion"
                                value="Delegacion"
                            />

                            <Dropdown
                                name="id_delegacion"
                                id="id_delegacion"
                                value={selectedDelegacion}
                                onChange={(e) => setSelectedDelegacion(e.value)}
                                options={delegaciones.data}
                                optionLabel="nombre"
                                placeholder="Seleccionar una delegacion"
                                className="w-full md:w-14rem"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.id_delegacion}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="fotos" value="Imagenes" />

                            <FileUpload
                                ref={fileUploadRef}
                                id="demo"
                                name="demo[]"
                                multiple
                                accept="image/*"
                                maxFileSize={10000000}
                                onUpload={onTemplateUpload}
                                onSelect={onTemplateSelect}
                                onError={onTemplateClear}
                                onClear={onTemplateClear}
                                headerTemplate={headerTemplate}
                                itemTemplate={itemTemplate}
                                emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions}
                                progressBarTemplate={<></>}
                                auto
                                customUpload
                                uploadHandler={customBase64Uploader}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.fotos}
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

CreateIdentidadCultural.layout = (page) => (
    <Layout title="Registrar identidad cultural" children={page} />
);

export default CreateIdentidadCultural;
