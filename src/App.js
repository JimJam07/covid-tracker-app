import React, {useEffect, useState} from 'react'
import {FormControl,Select, MenuItem, Card, CardContent} from '@material-ui/core'
import './App.css';
import Infobox from './components/infobox/Infobox';
import Map from './components/map/Map';
import Table from './components/table/Table';
import {prettyPrintStat, sortData} from './components/utils/utils'
import LineGraph from './components/graph/Linegraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setcountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo]= useState({});
  const [tableData, setTableData] = useState([])
  const [mapCenter,setMapCenter] = useState({
    lat: 20.5937,
    lng:78.9629,
  })
  const [mapZoom, setMapZoom] = useState(3);
 const [mapCountries, setMapCountries] = useState([])
 const [casesType,setCasesType] = useState("cases")


  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res=>res.json())
    .then(data=>{
      setCountryInfo(data)
    })
  },[])
  useEffect(()=>{
    const getCountriesData = async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res)=> res.json())
      .then((data)=>{
        const countriesInfo = data.map((country)=>{
          return {
            name: country.country,
            value: country.country
          }
        })
        const sortedData = sortData(data)
        setTableData(sortedData)
        setcountries(countriesInfo)
        setMapCountries(data);
      })
    }
    getCountriesData()
  },[])

  const countryChange = async (ev)=>{
    const value = ev.target.value;
    const url = (value=== "worldwide")?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${value}`

    await fetch(url)
    .then(res=> res.json())
    .then(data=>{
      setSelectedCountry(value);
      setCountryInfo(data)
      setMapCenter({lat:data.countryInfo.lat,lng:data.countryInfo.long})
      setMapZoom(4);
    })
  }
  console.log(countryInfo)
  return (
    <div className="app">
      <div className="app__left">

      <div className="app__header">
      <h1>COVID-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select
        variant="outlined"
        value={selectedCountry}
        onChange = {countryChange}
        >
        <MenuItem value="worldwide">World Wide</MenuItem>
       {countries.map((ele,index)=>{
         return (
          <MenuItem key={index} value={ele.value}>{ele.name}</MenuItem>
         )
       })}
        </Select>
      </FormControl>
      </div>

      <div className="app__stats">
        <Infobox 
        isRed={true}
        onClick={e=>setCasesType("cases")}
        active = {casesType==="cases"}
        title="coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases}/>
        <Infobox 
        onClick={e=>setCasesType("recovered")} 
        active = {casesType==="recovered"}
        title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered}/>
        <Infobox 
        isRed={true}
        onClick={e=>setCasesType("deaths")} 
        active = {casesType==="deaths"}
        title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths}/>
      </div>

      <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} casesType={casesType}/>

      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide New Cases</h3>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
