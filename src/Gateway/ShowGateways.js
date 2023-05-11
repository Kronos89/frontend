import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

//URL NestJS API
const URI = process.env.NESTJS

//Show Gateway
const ShowGateways = () => {

    const [gateways, setGateway] = useState([])
    useEffect( ()=>{
        getGateways()
    },[])

    //Show all gateways
    const getGateways = async () => {
        const res = await axios.get(URI)
        setGateway(res.data)
    }

    //Delete gateway
    const deleteGateway = async (serialNumber) => {
        await axios.delete(`${URI}/${serialNumber}`)
        getGateways()
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <table className='table'>
                        <thead className='table-primary'>
                        <tr>
                            <th>Serial Number</th>
                            <th>Name</th>
                            <th>Ip Address</th>
                            <th>Peripherals</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        { gateways.map ( (gateway) => (
                            <tr key={ gateway.serialNumber}>
                                <td> { gateway.serialNumber } </td>
                                <td> { gateway.name } </td>
                                <td> { gateway.ipAddress } </td>
                                <td>
                                    {gateway.peripherals.map((peripheral, index) => (
                                        <div key={index} className='peripheral'>
                                            <p>UID: {peripheral.uid}</p>
                                            <p>Vendor: {peripheral.vendor}</p>
                                            <p>Status: {peripheral.status}</p>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/edit/${gateway.serialNumber}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button onClick={ ()=>deleteGateway(gateway.serialNumber) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default ShowGateways