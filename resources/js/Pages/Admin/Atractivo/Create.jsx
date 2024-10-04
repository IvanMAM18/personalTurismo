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

const Create = ({ servicios,actividades, categorias, delegaciones }) => {
    const { data, setData, errors, post, processing, recentlySuccessful,transform } =
        useForm({
            nombre: "",
            direccion: "",
            descripcion: "",
            latitud: "24.142247",
            longitud: "-110.313131",
            tipo_acceso: null,
            horarios: null,
            historia: "",
            leyenda: "",
            subtitulo: "",
            recomendaciones: "",
            cover: null,
            principal: null,
            servicios: null,
            actividades: null,
            id_categoria: null,
            id_delegacion: null,
            fotos: null,
        });
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [selectedDelegacion, setSelectedDelegacion] = useState(null);
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [selectedActividades, setSelectedActividades] = useState([]);
    const [files, setFiles] = useState(null);

    const serviciosTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.nombre}
                    src={option.icono}
                    className={`mr-2`}
                    style={{ width: "24px" }}
                />
                <div>{option.nombre}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const length = selectedServicios ? selectedServicios.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> servicio{length > 1 ? "s" : ""} seleccionados.
            </div>
        );
    };

    const panelActividadesFooterTemplate = () => {
        const length = selectedActividades ? selectedActividades.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> actividad{length > 1 ? "es" : ""} seleccionadas.
            </div>
        );
    };

    function handleSubmit(e) {
        e.preventDefault();
        post(route("atractivos.store"));
    }

    useEffect(() => {
        setData("servicios", JSON.stringify([...selectedServicios]));
        // transform((data) => ({
        //     ...data,
        //     servicios: [...selectedServicios],
        //   }))
    }, [selectedServicios]);

    useEffect(() => {
        setData("actividades", JSON.stringify([...selectedActividades]));
    }, [selectedActividades]);

    useEffect(() => {
        if (!selectedCategoria) return
        setData("id_categoria", selectedCategoria.id);
    }, [selectedCategoria]);

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
                    href={route("atractivos")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Atractivos
                </Link>
                <span className="font-medium text-amber-600"> /</span> Nuevo
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Registrar atractivo
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
                            <InputLabel htmlFor="direccion" value="Direccion" />

                            <TextInput
                                id="direccion"
                                className="mt-1 block w-full"
                                value={data.direccion}
                                onChange={(e) =>
                                    setData("direccion", e.target.value)
                                }
                                required
                                
                                autoComplete="direccion"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.direccion}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="subtitulo" value="Subtitulo" />

                            <TextInput
                                id="subtitulo"
                                className="mt-1 block w-full"
                                value={data.subtitulo}
                                onChange={(e) =>
                                    setData("subtitulo", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.subtitulo}
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
                            <InputLabel htmlFor="horarios" value="Horarios" />

                            <TextInput
                                id="horarios"
                                className="mt-1 block w-full"
                                value={data.horarios}
                                onChange={(e) =>
                                    setData("horarios", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.horarios}
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
                            <InputLabel htmlFor="latitud" value="Latitud" />

                            <TextInput
                                id="latitud"
                                className="mt-1 block w-full"
                                value={data.latitud}
                                onChange={(e) =>
                                    setData("latitud", e.target.value)
                                }
                                required
                                
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
                                
                                autoComplete="longitud"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.longitud}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="tipo_acceso" value="Tipo acceso" />

                            <TextInput
                                id="tipo_acceso"
                                className="mt-1 block w-full"
                                value={data.tipo_acceso}
                                onChange={(e) =>
                                    setData("tipo_acceso", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.tipo_acceso}
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
                            <InputLabel
                                htmlFor="id_categoria"
                                value="Categoria"
                            />

                            <Dropdown
                                name="id_categoria"
                                value={selectedCategoria}
                                onChange={(e) => setSelectedCategoria(e.value)}
                                options={categorias.data}
                                optionLabel="nombre"
                                placeholder="Seleccionar una categoria"
                                className="w-full md:w-14rem"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.id_categoria}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="servicios" value="Servicios" />

                            <MultiSelect
                                value={selectedServicios}
                                options={servicios.data}
                                onChange={(e) => setSelectedServicios(e.value)}
                                optionLabel="nombre"
                                placeholder="Seleccionar servicios"
                                itemTemplate={serviciosTemplate}
                                panelFooterTemplate={panelFooterTemplate}
                                className="w-full md:w-20rem"
                                display="chip"
                                filter
                            />

                            <InputError
                                className="mt-2"
                                message={errors.servicios}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="actividades" value="Actividades" />

                            <MultiSelect
                                value={selectedActividades}
                                options={actividades.data}
                                onChange={(e) => setSelectedActividades(e.value)}
                                optionLabel="nombre"
                                placeholder="Seleccionar actividades"
                                itemTemplate={serviciosTemplate}
                                panelFooterTemplate={panelActividadesFooterTemplate}
                                className="w-full md:w-20rem"
                                display="chip"
                                filter
                            />

                            <InputError
                                className="mt-2"
                                message={errors.actividades}
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

Create.layout = (page) => (
    <Layout title="Registrar atractivo" children={page} />
);

export default Create;
