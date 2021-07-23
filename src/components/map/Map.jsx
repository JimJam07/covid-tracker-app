import React from 'react'
import "./map.css"
import {Map as LeafMap, TileLayer} from 'react-leaflet'
import { ShowDataOnMap } from '../utils/utils'

function Map({countries,casesType,center,zoom}) {
    return (
        <div className="map">
            <LeafMap  center={center} zoom ={zoom}>
            <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {ShowDataOnMap(countries,casesType)}
            </LeafMap>
        </div>
    )
}

export default Map
