import React from "react";

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
 
   <tr className="mb-2 text-blueGray-600 text-left"> <th >{label}</th>: <th> {value ? value : "Not assigned"}</th></tr>
 
);

export default InfoItem;
