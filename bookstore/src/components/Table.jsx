// src/TableComponent.js
import React from 'react';

const TableComponent = ({ data, columns }) => {
    return (
        <table className="styled-table">
            <thead>
            <tr>
                {columns.map((col, index) => (
                    <th className="styled-header">{col.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                        <td key={colIndex} className="styled-cell">{row[col.accessor]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
