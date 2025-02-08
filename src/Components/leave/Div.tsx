import React from "react";

const InfoCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div className="d-flex max-w-sm mx-2 my-10 ">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{value}</p>
            </div>
        </div>
    </div>
  );
};

export default InfoCard;
