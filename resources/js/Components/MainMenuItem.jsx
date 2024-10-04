import React from "react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Building, Flower, HeartHandshake, Layers, Mic2, Store, Tent, ThumbsUp, User } from "lucide-react";
import { Image } from "lucide-react";

const getIconFromName = (iconName, iconProps) => {
  switch (iconName) {
    case 'user':
      return <User className={iconProps} />;
    case 'building':
      return <Building className={iconProps} />;
    case 'layers':
      return <Layers className={iconProps} />;
    case 'hearthandshake':
      return <HeartHandshake className={iconProps} />;
    case 'tent':
      return <Tent className={iconProps} />;
    case 'mic2':
      return <Mic2 className={iconProps} />;
    case 'image':
      return <Image className={iconProps} />;
    case 'thumbsup':
      return <ThumbsUp className={iconProps} />;
    case 'store':
      return <Store className={iconProps} />;
    case 'flower':
      return <Flower className={iconProps} />;
  }
}

export default ({ icon, link, text }) => {
    const isActive = route().current(link + "*");

    const iconClasses = cn("w-4 h-4 mr-2", {
      "text-white group-hover:text-amber-200": !isActive,
      "text-amber-200 group-hover:text-white": isActive,
    });

    const textClasses = cn({
        "text-white group-hover:text-amber-200": !isActive,
        "text-amber-200 group-hover:text-white": isActive,
    });

    return (
        <div className="mb-4">
            <Link href={route(link)} className="flex items-center group py-3">
                {getIconFromName(icon,iconClasses)}
                <div className={textClasses}>{text}</div>
            </Link>
        </div>
    );
};
