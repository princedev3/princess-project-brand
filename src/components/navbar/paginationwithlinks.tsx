"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const PaginationWithLinks = ({
  page,
  pageSize,
  totalCount,
}: {
  page: number;
  pageSize: number;
  totalCount: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / pageSize);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page > 1) pages.push(1);
      if (page > 2) pages.push("...");
      pages.push(page);
      if (page < totalPages - 1) pages.push("...");
      if (page < totalPages) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex gap-3  justify-center mt-5 items-center">
      {/* Previous Button */}
      <button
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {getPageNumbers().map((p, index) => (
        <button
          key={index}
          onClick={() => typeof p === "number" && changePage(p)}
          className={`px-3 py-2 rounded ${
            p === page
              ? "bg-baseGreen hover:bg-baseGreen/80 text-white"
              : "bg-gray-200"
          }`}
          disabled={p === "..."}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page >= totalPages}
        onClick={() => changePage(page + 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
