import {
    IconBrandFacebookFilled,
    IconMail,
    IconPhoneCall,
    IconPin,
} from "@tabler/icons-react";
import Dropdown from "./Dropdown";
import { IconBrandInstagram } from "@tabler/icons-react";
import { IconBrandTwitterFilled } from "@tabler/icons-react";

export default function TopBar(props) {
    return <></>;
    return (
        <div className="flex items-center md:flex-row flex-col justify-between text-white border-b text-xs p-3 px-12 gap-5 z-[3] relative">
            <ul className="flex md:flex-row">
                <li className="border-l ml-2 pl-2">
                <a href="tel:+526121222986">
                    <IconPhoneCall className="inline" size={20}></IconPhoneCall>{" "}
                    +52 612 122 2986
                    </a>
                </li>
                <li className="border-l ml-2 pl-2">
                <a href="mailto:turismo@lapaz.gob.mx">
                    <IconMail className="inline" size={20}></IconMail>{" "}
                    turismo@lapaz.gob.mx
                    </a>
                </li>
                <li className="border-l ml-2 pl-2 hidden md:inline">
                    <IconPin className="inline" size={20}></IconPin>
                    Gral. Félix Ortega #1745 e/ Melchor Ocampo y Santos Degollado
                </li>
            </ul>
            <ul className="flex  md:gap-4 md:items-center">
                <li className="flex gap-3">
                <a href="https://www.facebook.com/TurismoMunicipalLaPaz" target="_blank">
                        <IconBrandFacebookFilled
                            className="inline"
                            size={20}
                        ></IconBrandFacebookFilled>
                    </a>{" "}
                    <a href="https://twitter.com/turismolapaz1" target="_blank">
                    <IconBrandTwitterFilled
                        className="inline"
                        size={20}
                    ></IconBrandTwitterFilled></a>{" "}
                    <a href="https://www.instagram.com/turismolapaz/" target="_blank">
                        <IconBrandInstagram
                            className="inline"
                            size={20}
                        ></IconBrandInstagram>
                    </a>
                </li>
                <li className="border-l ml-2 pl-2">
                {props.temperatura['c']}°C / {props.temperatura['f']}°F La Paz, B.C.S.
                </li>
                <li className="border-l ml-2 pl-2">{props.fecha}</li>
                <li className="border-l ml-2 pl-2">{props.hora}</li>
            </ul>
        </div>
    );
}
