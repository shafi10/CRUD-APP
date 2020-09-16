import React,{useContext} from 'react'
import {dataApi } from '../contexApi/dataContex'

export const Alert = () => {
    const { alerts } = useContext( dataApi )
    console.log(alerts)
    return (  
         alerts !== null && alerts.length > 0 && alerts.map(alert =>
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
         {alert.msg}
        </div>
            )
    ) 
}

export default Alert;
