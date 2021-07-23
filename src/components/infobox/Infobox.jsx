import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"
import './infobox.css'

function Infobox({ title, cases,active,isRed, total,...props}) {
    return (
       <Card 
       className={`infobox ${active&& 'infobox--selected'} ${isRed&& 'infobox--red'}`}
       onClick = {props.onClick}
       >
           <CardContent>
               <Typography color = "textSecondary" className="infobox__title">
                   {title}
               </Typography>
               <h2 className={`infobox__cases ${!isRed && 'text--green'}`}>{cases}</h2>
               <Typography color="textSecondary" className="infobox__total">
                   {total}
                   </Typography>
           </CardContent>
       </Card>
    )
}

export default Infobox
