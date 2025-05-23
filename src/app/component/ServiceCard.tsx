// components/ServiceCard.tsx
import React from "react";

type Props = {
  name: string;
  price: string;
  time: string;
  onClick?: () => void;
};

export default function ServiceCard({
  name: title,
  price,
  time,
  onClick,
}: Props) {
  return (
    <div
      className="border p-4 rounded-md bg-white shadow hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">Narxi: {price}$ </p>
      <p className="text-sm text-gray-600">Vaqti: {time} minutes</p>
    </div>
  );
}
