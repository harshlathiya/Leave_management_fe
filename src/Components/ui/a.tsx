import React from "react";
import Link from "next/link";
interface LinkDetails {
  linkDetails: { href: string; title: string }[] | null;
}
function A({ links }: { links: LinkDetails }) {
  const { linkDetails } = links;
  const components = linkDetails;
  return (
    <>
      {components?.map(
        (component: { href: string; title: string }, i: number) => (
          <Link
            href={component.href}
            key={i}
            className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group"
          >
            {component.title}
          </Link>
        )
      )}
    </>
  );
}

export default A;
