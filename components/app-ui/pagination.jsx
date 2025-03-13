"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationDemo({ total, perPage = 10 }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(total / perPage);

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const renderPaginationItems = () => {
        const pages = [];
        const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

        if (totalPages <= 5) {
            pages.push(...range(1, totalPages));
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("ellipsis");
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            pages.push(...range(start, end));
            if (currentPage < totalPages - 2) pages.push("ellipsis");
            pages.push(totalPages);
        }

        return pages.map((page, index) =>
            page === "ellipsis" ? (
                <PaginationItem key={index + 1}>
                    <PaginationEllipsis />
                </PaginationItem>
            ) : (
                <PaginationItem key={page}>
                    <PaginationLink href="#" isActive={page === currentPage} onClick={() => goToPage(page)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )
        );
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => goToPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
