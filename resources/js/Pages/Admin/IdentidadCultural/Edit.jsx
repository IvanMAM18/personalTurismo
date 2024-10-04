import DeleteButton from "@/Components/DeleteButton";
import Layout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState, useRef } from "react";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import RestoreButton from "@/Components/RestoreButton";
import FileInput from "@/Components/FileInput";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import TextArea from "@/Components/TextArea";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Carousel } from "primereact/carousel";
import { InfoIcon, MapPinIcon, Trash, Upload } from "lucide-react";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import ValidarButton from "@/Components/ValidarButton";
import NoValidarButton from "@/Components/NoValidarButton";
import GoogleMapReact from "google-map-react";

const EditIdentidadCultural = ({ identidad_cultural, delegaciones }) => {
    const { auth } = usePage().props;

    console.log(identidad_cultural, delegaciones);
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            nombre: identidad_cultural.data.nombre || "",
            descripcion: identidad_cultural.data.descripcion || "",
            historia: identidad_cultural.data.historia || "",
            leyenda: identidad_cultural.data.leyenda || "",
            recomendaciones: identidad_cultural.data.recomendaciones || "",
            id_delegacion: identidad_cultural.data.id_delegacion || null,
            cover: null,
            principal: null,
            fotos: null,
            _method: "put",
        });

    const [selectedDelegacion, setSelectedDelegacion] = useState(
        data.id_delegacion || null
    );
    const [files, setFiles] = useState(null);
    // console.log(data);
    
    useEffect(() => {
        if (!selectedDelegacion) return;

        setData("id_delegacion", selectedDelegacion);
    }, [selectedDelegacion]);

    useEffect(() => {
        setData("fotos", files);
    }, [files]);

    function handleSubmit(e) {
        e.preventDefault();

        post(route("identidad-cultural.update", identidad_cultural.data.id), {
            onFinish: (visit) => {
                fileUploadRef.current.clear();
                setFiles(null);
            },
        });
    }

    function destroy(event) {
        confirmPopup({
            target: event.currentTarget,
            message: "Estas seguro que deseas eliminar este registro?",
            icon: <InfoIcon></InfoIcon>,
            acceptClassName: "p-button-danger",
            acceptLabel: "Si",
            async accept() {
                router.delete(route("identidad-cultural.destroy", identidad_cultural.data.id));
            },
            reject() {},
        });
    }

    function restore(event) {
        confirmPopup({
            target: event.currentTarget,
            message: "Estas seguro que deseas restaurar este registro?",
            icon: <InfoIcon></InfoIcon>,
            acceptClassName: "p-button-success",
            acceptLabel: "Si",
            async accept() {
                router.put(route("identidad-cultural.restore", identidad_cultural.data.id));
            },
            reject() {},
        });
    }

    function validar(event) {
        confirmPopup({
            target: event.currentTarget,
            message: "Desea validar?",
            icon: <InfoIcon></InfoIcon>,
            acceptClassName: "p-button-success",
            acceptLabel: "Si",
            async accept() {
                router.put(
                    route("identidad-cultural.validar", identidad_cultural.data.id)
                );
            },
            reject() {},
        });
    }

    function novalidar(event) {
        confirmPopup({
            target: event.currentTarget,
            message: "Desea no validar?",
            icon: <InfoIcon></InfoIcon>,
            acceptClassName: "p-button-success",
            acceptLabel: "Si",
            async accept() {
                router.put(
                    route("identidad-cultural.novalidar", identidad_cultural.data.id)
                );
            },
            reject() {},
        });
    }

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        console.log(e);
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
        const value = totalSize / 50000;
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
                    <span>{formatedValue} / 5 MB</span>
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

    const CarouselOrEmpty = () => {
        if (identidad_cultural.data.fotos.length == 0) return <></>;
        return (
            <Carousel
                value={identidad_cultural.data.fotos}
                numVisible={3}
                numScroll={1}
                itemTemplate={fotosTemplate}
            />
        );
    };

    const fotosTemplate = (foto) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={foto.foto} alt={foto.id} />
                </div>
                <div>
                    <div className="mt-5 flex justify-center">
                        <Button
                            icon={<Trash></Trash>}
                            rounded
                            severity="danger"
                            className="button-delete"
                            onClick={(event) => confirmDelete(foto.id, event)}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const confirmDelete = (id, event) => {
        event.preventDefault();
        confirmPopup({
            target: event.currentTarget,
            message: "Desea eliminar esta foto?",
            icon: <InfoIcon></InfoIcon>,
            acceptClassName: "p-button-danger",
            acceptLabel: "Si",
            async accept() {
                router.delete(
                    route("identidad-cultural.destroyFoto", {
                        identidad_cultural: identidad_cultural.data.id,
                        fotoId: id,
                    })
                );
            },
            reject() {},
        });
    };

    return (
        <div className="w-full">
            <Head title={identidad_cultural.data.nombre} />
            <Toast ref={toast}></Toast>
            <ConfirmPopup />
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
                <span className="mx-2 font-medium text-amber-600">/</span>
                {identidad_cultural.data.nombre}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar identidad_cultural
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
                                isFocused
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
                            {identidad_cultural.data.cover && (
                                <img
                                    className="block w-[500px] h-[200px]"
                                    src={identidad_cultural.data.cover}
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
                            {identidad_cultural.data.principal && (
                                <img
                                    className="block w-[500px] h-[200px]"
                                    src={identidad_cultural.data.principal}
                                />
                            )}
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
                                value={selectedDelegacion}
                                onChange={(e) => setSelectedDelegacion(e.value)}
                                options={delegaciones.data}
                                optionLabel="nombre"
                                optionValue="id"
                                placeholder="Seleccionar una delegacion"
                                className="w-full md:w-14rem"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.id_delegacion}
                            />
                        </div>
                       
                        <div>
                            <InputLabel htmlFor="demo" value="Imagenes" />

                            <CarouselOrEmpty />

                            <FileUpload
                                ref={fileUploadRef}
                                id="demo"
                                name="demo[]"
                                multiple
                                accept="image/*"
                                maxFileSize={5000000}
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

                            {!identidad_cultural.data.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {identidad_cultural.data.deleted_at && (
                                <RestoreButton onRestore={restore}>
                                    Restaurar
                                </RestoreButton>
                            )}
{auth.user.role == "admin" && !identidad_cultural.data.validado && (
                            <ValidarButton onRestore={validar}>
                                Validar
                            </ValidarButton>
    )}
    {auth.user.role == "admin" && identidad_cultural.data.validado && (
                            <NoValidarButton onRestore={novalidar}>
                                No Validar
                            </NoValidarButton>
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

EditIdentidadCultural.layout = (page) => <Layout children={page} />;

export default EditIdentidadCultural;
