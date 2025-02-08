// components/Pagination.tsx
import React, { useState } from "react";
import Image from "next/image"; // Import Image from Next.js (adjust path if necessary)
import nextArrow from "@/app/assets/images/fast-forward.png";
import backArrow from "@/app/assets/images/fast-backward.png";
type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  maxPage,
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: number
  ) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <ul className="flex items-center -space-x-px h-10 text-base justify-end">
      <li>
        <a
          href="#"
          onClick={(e) =>
            handleClick(e, currentPage > 1 ? currentPage - 1 : currentPage)
          }
          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous</span>
          <Image src={backArrow} alt="Back" width={32} height={32} />
        </a>
      </li>
      {Array.from(
        {
          length:
            Math.min(maxPage, currentPage + 2) -
            Math.max(1, currentPage - 2) +
            1,
        },
        (_, index) => Math.max(1, currentPage - 2) + index
      ).map((page) => (
        <li key={page}>
          <a
            href="#"
            onClick={(e) => handleClick(e, page)}
            className={`flex items-center justify-center px-4 h-10 leading-tight ${
              currentPage === page
                ? "text-blue-600 bg-blue-50 border-blue-300"
                : "text-gray-500 bg-white border-gray-300"
            } hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {page}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#"
          onClick={(e) =>
            handleClick(
              e,
              currentPage < maxPage ? currentPage + 1 : currentPage
            )
          }
          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next</span>

          <Image src={nextArrow} alt="Next" width={32} height={32} />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
