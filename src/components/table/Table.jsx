import React from 'react'
import './table.css';
import numeral from 'numeral'

function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases},index)=>{
                return(<tr key={index}>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0x")}</strong></td>
                </tr>)
            })}
        </div>
    )
}

export default Table
