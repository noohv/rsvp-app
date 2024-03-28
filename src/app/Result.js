import React from "react";

export default function Result({ data, order }) {
  const displayResults = order.map((number, index) => (
    <li key={index + 1}>
      {index + 1}. tests:{" "}
      {data[`test${number}`].result != null
        ? `${Math.round(data[`test${number}`].result)} ms (milisekundes)`
        : "Nav fiksēts"}
    </li>
  ));

  return (
    <div className="m-5">
      Jūsu reakciju testu rezultāti:
      <ul className="list-disc">{displayResults}</ul>
    </div>
  );
}
