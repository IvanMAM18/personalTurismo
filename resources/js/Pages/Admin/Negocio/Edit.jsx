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

const EditNegocio = ({
    negocio,
    categorias,
    delegaciones,
    categoriasExperiencia,
}) => {
    const { auth } = usePage().props;

    console.log(negocio, delegaciones);
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            nombre: negocio.data.nombre || "",
            direccion: negocio.data.direccion || "",
            descripcion: negocio.data.descripcion || "",
            id_delegacion: negocio.data.id_delegacion || null,
            id_categoria_experiencia:
                negocio.data.id_categoria_experiencia || null,
            latitud: negocio.data.latitud || "",
            longitud: negocio.data.longitud || "",
            redes_sociales: negocio.data.redes_sociales || null,
            paginaweb: negocio.data.paginaweb || null,
            contacto_telefono: negocio.data.contacto_telefono || null,
            contacto_persona: negocio.data.contacto_persona || null,
            contacto_correo: negocio.data.contacto_correo || null,
            contacto_puesto: negocio.data.contacto_puesto || null,
            id_comercio: negocio.data.id_comercio || null,
            cover: null,
            principal: null,
            fotos: null,
            categorias: JSON.stringify(negocio.data.categorias) || "",
            _method: "put",
        });

    const [selectedDelegacion, setSelectedDelegacion] = useState(
        data.id_delegacion || null
    );
    const [selectedCategoriaExperiencia, setSelectedCategoriaExperiencia] =
        useState(data.id_categoria_experiencia || null);
    const [selectedCategorias, setSelectedCategorias] = useState(
        negocio.data.categorias || null
    );

    const [files, setFiles] = useState(null);
    // console.log(data);

    useEffect(() => {
        if (!selectedDelegacion) return;

        setData("id_delegacion", selectedDelegacion);
    }, [selectedDelegacion]);

    useEffect(() => {
        if (!selectedCategoriaExperiencia) return;

        setData("id_categoria_experiencia", selectedCategoriaExperiencia);
    }, [selectedCategoriaExperiencia]);

    useEffect(() => {
        if (!selectedCategorias) return;
        console.log(selectedCategorias);
        setData("categorias", JSON.stringify([...selectedCategorias]));
    }, [selectedCategorias]);

    useEffect(() => {
        setData("fotos", files);
    }, [files]);

    function handleSubmit(e) {
        e.preventDefault();

        post(route("negocios.update", negocio.data.id), {
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
                router.delete(route("negocios.destroy", negocio.data.id));
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
                router.put(route("negocios.restore", negocio.data.id));
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
                router.put(route("negocios.validar", negocio.data.id));
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
                router.put(route("negocios.novalidar", negocio.data.id));
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

    const categoriasTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.nombre}</div>
            </div>
        );
    };

    const panelCategoriasFooterTemplate = () => {
        const length = selectedCategorias ? selectedCategorias.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> categoria{length > 1 ? "s" : ""} seleccionadas.
            </div>
        );
    };
    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        //const file = event.files[0];
        console.log(event.files);
        setFiles(event.files);
    };

    const CarouselOrEmpty = () => {
        if (negocio.data.fotos.length == 0) return <></>;
        return (
            <Carousel
                value={negocio.data.fotos}
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
                    route("negocios.destroyFoto", {
                        negocio: negocio.data.id,
                        fotoId: id,
                    })
                );
            },
            reject() {},
        });
    };

    const Marker = () => (
        <MapPinIcon
            // size={20}
            style={{
                transform: "translate(-50%, -100%)",
                color: "red",
            }}
        />
    );

    const createMapOptions = (maps) => {
        // next props are exposed at maps
        // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
        // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
        // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
        // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
        // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_CENTER,
                style: maps.ZoomControlStyle.SMALL,
            },
            mapTypeControlOptions: {
                position: maps.ControlPosition.TOP_RIGHT,
            },
            mapTypeControl: true,
        };
    };

    return (
        <div className="w-full">
            <Head title={negocio.data.nombre} />
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
                    href={route("negocios")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Negocios
                </Link>
                <span className="mx-2 font-medium text-amber-600">/</span>
                {negocio.data.nombre}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar negocio
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel
                                htmlFor="categorias"
                                value="Categorias"
                            />

                            <MultiSelect
                                value={selectedCategorias}
                                options={categorias.data}
                                onChange={(e) => setSelectedCategorias(e.value)}
                                optionLabel="nombre"
                                optionValue="id"
                                placeholder="Seleccionar categorias"
                                itemTemplate={categoriasTemplate}
                                panelFooterTemplate={
                                    panelCategoriasFooterTemplate
                                }
                                className="w-full md:w-20rem"
                                display="chip"
                                filter
                            />

                            <InputError
                                className="mt-2"
                                message={errors.actividades}
                            />
                        </div>
                        {selectedCategorias.find(
                            (e) => e==3//experiencias
                        ) && (
                            <div>
                                <InputLabel
                                    htmlFor="id_categoria_experiencia"
                                    value="Categoria Experiencia"
                                />

                                <Dropdown
                                    name="id_categoria_experiencia"
                                    value={selectedCategoriaExperiencia}
                                    onChange={(e) =>
                                        setSelectedCategoriaExperiencia(e.value)
                                    }
                                    options={categoriasExperiencia.data}
                                    optionLabel="nombre"
                                    optionValue="id"
                                    placeholder="Seleccionar una categoria"
                                    className="w-full md:w-14rem"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.id_categoria_experiencia}
                                />
                            </div>
                        )}
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
                            <InputLabel htmlFor="direccion" value="Direccion" />

                            <TextInput
                                id="direccion"
                                className="mt-1 block w-full"
                                value={data.direccion}
                                onChange={(e) =>
                                    setData("direccion", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="direccion"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.direccion}
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
                            <InputLabel
                                htmlFor="redes_sociales"
                                value="Redes sociales"
                            />

                            <TextInput
                                id="redes_sociales"
                                className="mt-1 block w-full"
                                value={data.redes_sociales}
                                onChange={(e) =>
                                    setData("redes_sociales", e.target.value)
                                }
                                autoComplete="redes_sociales"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.redes_sociales}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="paginaweb"
                                value="Pagina web"
                            />

                            <TextInput
                                id="paginaweb"
                                className="mt-1 block w-full"
                                value={data.paginaweb}
                                onChange={(e) =>
                                    setData("paginaweb", e.target.value)
                                }
                                autoComplete="paginaweb"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.paginaweb}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="contacto_telefono"
                                value="Contacto telefono"
                            />

                            <TextInput
                                id="contacto_telefono"
                                className="mt-1 block w-full"
                                value={data.contacto_telefono}
                                onChange={(e) =>
                                    setData("contacto_telefono", e.target.value)
                                }
                                autoComplete="contacto_telefono"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.contacto_telefono}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="contacto_persona"
                                value="Contacto persona"
                            />

                            <TextInput
                                id="contacto_persona"
                                className="mt-1 block w-full"
                                value={data.contacto_persona}
                                onChange={(e) =>
                                    setData("contacto_persona", e.target.value)
                                }
                                autoComplete="contacto_persona"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.contacto_persona}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="contacto_correo"
                                value="Contacto correo"
                            />

                            <TextInput
                                id="contacto_correo"
                                className="mt-1 block w-full"
                                value={data.contacto_correo}
                                onChange={(e) =>
                                    setData("contacto_correo", e.target.value)
                                }
                                autoComplete="contacto_correo"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.contacto_correo}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="contacto_puesto"
                                value="Contacto puesto"
                            />

                            <TextInput
                                id="contacto_puesto"
                                className="mt-1 block w-full"
                                value={data.contacto_puesto}
                                onChange={(e) =>
                                    setData("contacto_puesto", e.target.value)
                                }
                                autoComplete="contacto_puesto"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.contacto_puesto}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="latitud" value="Latitud" />

                            <TextInput
                                id="latitud"
                                className="mt-1 block w-full"
                                value={data.latitud}
                                onChange={(e) =>
                                    setData("latitud", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="latitud"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.latitud}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="longitud" value="Longitud" />

                            <TextInput
                                id="longitud"
                                className="mt-1 block w-full"
                                value={data.longitud}
                                onChange={(e) =>
                                    setData("longitud", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="longitud"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.longitud}
                            />
                        </div>

                        <p>
                            Seleccione la ubicación exacta del establecimiento
                            haciendo click en el mapa:
                        </p>
                        <div
                            style={{
                                height: "30vh",
                                width: "100%",
                            }}
                        >
                            <GoogleMapReact
                                gleMapReact
                                onClick={({ lat, lng }) => {
                                    setData({
                                        ...data,
                                        latitud: lat,
                                        longitud: lng,
                                    });
                                }}
                                bootstrapURLKeys={{
                                    key: "AIzaSyAp2zsijKSTOl9BLx6CDcyNIN9KhINXTzM",
                                }}
                                defaultCenter={{
                                    lat: 24.1481589,
                                    lng: -110.3181937,
                                }}
                                center={{
                                    lat: +data.latitud,
                                    lng: +data.longitud,
                                }}
                                defaultZoom={18}
                                options={createMapOptions}
                            >
                                <Marker
                                    lat={data.latitud}
                                    lng={data.longitud}
                                    text={data.nombre}
                                />
                            </GoogleMapReact>
                        </div>

                        <div>
                            <InputLabel htmlFor="cover" value="Cover" />
                            {negocio.data.cover && (
                                <img
                                    className="block w-[500px] h-[200px]"
                                    src={negocio.data.cover}
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
                            {negocio.data.principal && (
                                <img
                                    className="block w-[500px] h-[200px]"
                                    src={negocio.data.principal}
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

                            {!negocio.data.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {negocio.data.deleted_at && (
                                <RestoreButton onRestore={restore}>
                                    Restaurar
                                </RestoreButton>
                            )}
                            {auth.user.role == "admin" &&
                                !negocio.data.validado && (
                                    <ValidarButton onRestore={validar}>
                                        Validar
                                    </ValidarButton>
                                )}
                            {auth.user.role == "admin" &&
                                negocio.data.validado && (
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

EditNegocio.layout = (page) => <Layout children={page} />;

export default EditNegocio;
