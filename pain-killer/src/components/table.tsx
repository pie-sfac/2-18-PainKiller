import React from 'react';

export default function Table({ columns, data }) {
  return (
    <div>
      <table className="w-full m-0">
        <thead>
          <tr className="text-[#2d62ea] text-sm">
            {columns.map((column) => (
              <th className="px-3 py-2" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white ">
          {data.map(({ attendance, progress_time, member_name, remaining }) => (
            <tr key={attendance + progress_time + member_name + remaining}>
              <td className="py-2">{attendance}</td>
              <td>{progress_time}</td>
              <td>{member_name}</td>
              <td>{remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pb-1 bg-white rounded-b-lg">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="4"
            viewBox="0 0 20 4"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#1D1D1D" />
            <circle cx="10" cy="2" r="2" fill="#D9D9D9" />
            <circle cx="18" cy="2" r="2" fill="#D9D9D9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
