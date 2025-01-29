import React, { useEffect, useState, useRef } from "react";
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
import { InfoIcon, MapPinIcon, SearchIcon, Trash, Upload } from "lucide-react";
import { OverlayPanel } from "primereact/overlaypanel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import GoogleMapReact from "google-map-react";

const Create = ({ delegaciones, categorias, categoriasExperiencia }) => {
    const {
        data,
        setData,
        errors,
        post,
        processing,
        recentlySuccessful,
        transform,
    } = useForm({
        nombre: "",
        direccion: "",
        descripcion: "",
        latitud: "24.142247",
        longitud: "-110.313131",
        redes_sociales: null,
        paginaweb: null,
        contacto_telefono: null,
        contacto_persona: null,
        contacto_correo: null,
        contacto_puesto: null,
        id_comercio: null,
        cover: null,
        principal: null,
        id_delegacion: null,
        fotos: null,
        categorias: null,
        id_categoria_experiencia: null,
    });
    const [selectedDelegacion, setSelectedDelegacion] = useState(null);
    const [files, setFiles] = useState(null);
    const [products, setProducts] = useState(null);
    const [selectedNegocio, setSelectedNegocio] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [selectedCategoriaExperiencia, setSelectedCategoriaExperiencia] =
        useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (data.id_comercio == null) {
            toast.current.show({
                severity: "warn",
                summary: "Aviso",
                detail: "Se debe seleccionar un negocio.",
                life: 3000,
            });
            return false;
        }
        post(route("negocios.store"));
    }
    useEffect(() => {
        if (!selectedDelegacion) return;

        setData("id_delegacion", selectedDelegacion.id);
    }, [selectedDelegacion]);

    useEffect(() => {
        if (!selectedCategoriaExperiencia) return;

        setData("id_categoria_experiencia", selectedCategoriaExperiencia.id);
    }, [selectedCategoriaExperiencia]);

    useEffect(() => {
        setData("fotos", files);
    }, [files]);

    useEffect(() => {
        setData("categorias", JSON.stringify([...selectedCategorias]));
    }, [selectedCategorias]);

    const op = useRef(null);
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const isMounted = useRef(false);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    useEffect(() => {
        if (isMounted.current && selectedNegocio) {
            console.log(selectedNegocio);
            op.current.hide();
            toast.current.show({
                severity: "info",
                summary: "Negocio seleccionado",
                detail: selectedNegocio.nombre,
                life: 3000,
            });
            setData({
                ...data,
                nombre: selectedNegocio.nombre,
                direccion: selectedNegocio.direccion,
                descripcion: selectedNegocio.descripcion,
                latitud: selectedNegocio.latlng.latitude,
                longitud: selectedNegocio.latlng.longitude,
                id_comercio: selectedNegocio.id,
            });
        }
    }, [selectedNegocio]);

    async function fetchNegocios() {
        const negociosResponse = await fetch("/admin/negocioscomercio");
        const negocios = await negociosResponse.json();
        return negocios;
    }

    useEffect(() => {
        isMounted.current = true;
        fetchNegocios().then((banners) => {
            setProducts(banners);
        });
    }, []);

    const onProductSelect = (e) => {
        setSelectedNegocio(e.value);
    };

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

    const imageBody = (rowData) => {
        return (
            <img
                src={`${rowData.foto_frontal}`}
                alt={rowData.descripcion}
                className="w-20 shadow-1"
            />
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <SearchIcon size={18}></SearchIcon>
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Buscar"
                    />
                </span>
            </div>
        );
    };
    const selectedNegocioContent = selectedNegocio && (
        <div className="p-5 surface-card shadow-2 border-round">
            <div className="relative">
                <a target="_blank" href={selectedNegocio.foto_frontal}>
                    <img
                        src={selectedNegocio.foto_frontal}
                        alt={selectedNegocio.nombre}
                        className="w-6/12"
                    ></img>
                </a>
            </div>
            <div className="flex align-items-center justify-content-between mt-3 mb-2">
                <span className="text-900">
                    Giros
                    <ul className="list-none">
                        {selectedNegocio.giros_comerciales &&
                            selectedNegocio.giros_comerciales.map((val) => {
                                return <li>{val}</li>;
                            })}
                    </ul>
                </span>
            </div>
            <div className="flex align-items-center justify-content-between mt-3 mb-2">
                <span className="text-900">
                    Horarios
                    {selectedNegocio.horarios &&
                        Object.entries(selectedNegocio.horarios).map(
                            ([key, val] = entry) => {
                                return (
                                    <div>
                                        {" "}
                                        {key} : {val}
                                    </div>
                                );
                            }
                        )}
                </span>
                <span className="text-900 ml-3">
                    {selectedNegocio.telefono}
                </span>
            </div>
            <InputError className="mt-2" message={errors.id_comercio} />
        </div>
    );

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
                    href={route("negocios")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Negocios
                </Link>
                <span className="font-medium text-amber-600"> /</span> Nuevo
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Registrar negocio
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <div className="mt-5">
                        <Button
                            type="button"
                            size="small"
                            icon={<SearchIcon className="mr-1"></SearchIcon>}
                            label={"Buscar negocio"}
                            onClick={(e) => op.current.toggle(e)}
                        />
                        {selectedNegocioContent}
                    </div>
                    <OverlayPanel ref={op} showCloseIcon>
                        <DataTable
                            value={products}
                            selectionMode="single"
                            paginator
                            rows={7}
                            selection={selectedNegocio}
                            filters={filters}
                            filterDisplay="row"
                            onSelectionChange={(e) =>
                                setSelectedNegocio(e.value)
                            }
                            header={renderHeader()}
                        >
                            <Column
                                field="nombre"
                                header="Nombre"
                                sortable
                                style={{ minWidth: "5rem" }}
                            />
                            <Column
                                field="direccion"
                                header="Direccion"
                                style={{ minWidth: "5rem" }}
                            />
                            {/* <Column header="Foto" body={imageBody} /> */}
                        </DataTable>
                    </OverlayPanel>

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
                            (e) => e.nombre === "EXPERIENCIAS"
                        ) && (
                            <div>
                                <InputLabel
                                    htmlFor="id_categoria_experiencia"
                                    value="Categoria Experiencia"
                                />

                                <Dropdown
                                    name="id_categoria_experiencia"
                                    id="id_categoria_experiencia"
                                    value={selectedCategoriaExperiencia}
                                    onChange={(e) =>
                                        setSelectedCategoriaExperiencia(e.value)
                                    }
                                    options={categoriasExperiencia.data}
                                    optionLabel="nombre"
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
                                    key: "AIzaSyDDsXWAnmhPpTP9St_pt27H16RD771s7dI",
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

Create.layout = (page) => <Layout title="Registrar negocio" children={page} />;

export default Create;
