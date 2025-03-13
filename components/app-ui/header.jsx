import Image from "next/image";
import { headerImage } from "@/public";

export default function Header() {
    return (
        <header className="relative w-full h-[50vh] sm:h-[70vh] md:h-screen rounded-lg overflow-hidden">
            <div className="relative h-full w-full">
                <Image
                    src={headerImage}
                    alt="Header image"
                    fill
                    sizes="100vw"
                    className="rounded-lg object-cover object-center"
                    priority
                />
            </div>
        </header>
    );
}
