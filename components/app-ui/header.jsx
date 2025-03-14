import Image from "next/image";
import { headerImage } from "@/public";

export default function Header() {
    return (
        <header className="relative w-full h-[50vh] sm:h-[70vh] md:h-screen md:rounded-lg overflow-hidden">
            <div className="relative h-full w-full">
                <Image
                    src="https://res.cloudinary.com/dviwggb7g/image/upload/v1732468902/images/IMG-20241124-WA0002_qmkt7a.jpg"
                    alt="Header image"
                    fill
                    sizes="100vw"
                    className="rounded-none md:rounded-lg object-cover object-center"
                    priority
                />
            </div>
        </header>
    );
}
