import React from "react";
import MainMenuItem from "./MainMenuItem";
import { usePage } from "@inertiajs/react";

export default ({ className }) => {
    const { auth } = usePage().props;

    return (
        <div className={className}>
            {auth.user.role == "admin" && (
                <>
                    <MainMenuItem text="Usuarios" link="users" icon="user" />
                    <MainMenuItem
                        text="Delegaciones"
                        link="delegaciones"
                        icon="building"
                    />
                    <MainMenuItem
                        text="Categorias"
                        link="categorias"
                        icon="layers"
                    />
                    <MainMenuItem
                        text="Servicios"
                        link="servicios"
                        icon="hearthandshake"
                    />
                    <MainMenuItem
                        text="Actividades"
                        link="actividades"
                        icon="tent"
                    />
                    <MainMenuItem text="Eventos" link="eventos" icon="mic2" />
                    <MainMenuItem text="Banners" link="banners" icon="image" />
                </>
            )}
            <MainMenuItem text="Atractivos" link="atractivos" icon="thumbsup" />
            <MainMenuItem text="Negocios" link="negocios" icon="store" />
            <MainMenuItem
                text="Categorias exp."
                link="categorias-experiencia"
                icon="layers"
            />
            <MainMenuItem
                text="Identidad cultural"
                link="identidad-cultural"
                icon="flower"
            />
            {auth.user.role == "admin" && (
                <>
                    <MainMenuItem text="Bazar" link="bazar-admin" icon="store" />
                </>
            )}
        </div>
    );
};
