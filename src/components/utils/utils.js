import React from 'react'
import numeral from 'numeral'
import {Circle,Popup} from 'react-leaflet'

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };


export const sortData =(data)=>{
    const sortedData = [...data];

    sortedData.sort((a,b)=> a.cases>b.cases? -1:1)
    return sortedData;
}

export  const buildChartData = (data,casesType) => {
    let chartData=[];
    let lastDataPoint
    for(let ele in data.cases){
        if(lastDataPoint){
            const newDataPoint ={
                x:ele,
                y:data[casesType][ele] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data['cases'][ele]
    }
    return chartData
 }

 export const ShowDataOnMap = (data, casesType)=>{
     return data.map(country=>(
         <Circle
         center = {[country.countryInfo.lat,country.countryInfo.long]}
         fillOpacity={0.4}
         color = {casesTypeColors[casesType].hex}
         fillColor= {casesTypeColors[casesType].hex}
         radius = {
             Math.pow(country[casesType],(1/2.2))* casesTypeColors[casesType].multiplier
         }
         >
         <Popup>
             <div className="info-container">
             <div 
             style={{backgroundImage:`url(${country.countryInfo.flag})`}}
             className="info-flag"
             >
             </div>
             <div className="info-name">{country.country}</div>
                 <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                 <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                 <div className="info-deaths">Deaths: {numeral(country.Deaths).format("0,0")}</div>
             </div>
         </Popup>
         </Circle>
     ))
 }

 export const prettyPrintStat = (stat) =>{
     return stat? `+${numeral(stat).format("0.0a")}`:"0"
 }