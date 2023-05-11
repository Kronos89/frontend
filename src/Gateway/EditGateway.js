import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//URL of node-app
const URI = process.env.NESTJS + "/"

//Edit Gateway
const EditGateway = () => {
    const [serialNumber, setSerialNumber] = useState('')
    const [name, setName] = useState('')
    const [ipAddress, setIpAddress] = useState('')
    const navigate = useNavigate()
    const {serial} = useParams()

    //Update procedure
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+serial, {
            serialNumber: serialNumber,
            name: name,
            ipAddress: ipAddress
        })
        navigate('/')
    }

    useEffect( ()=> {
        getGatewayBySerial()
    },[])

    const getGatewayBySerial = async () => {
        const res = await axios.get(URI+serial)
        if (res.data.length > 0) { // make sure the array is not empty
            const gateway = res.data[0] // get the first object in the array
            setSerialNumber(gateway.serialNumber)
            setName(gateway.name)
            setIpAddress(gateway.ipAddress)
        }
    }

    return (
        <div className="container">
            <div className="row-cols-4">
                <h3>Edit Gateway</h3>
                <form onSubmit={update}>
                    <div className="mb-3">
                        <label className="form-label">Serial Number</label>
                        <input
                            value={serialNumber}
                            onChange={ (e)=> setSerialNumber(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Name</label>
                        <textarea
                            value={name}
                            onChange={ (e)=> setName(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Ip Address</label>
                        <textarea
                            value={ipAddress}
                            onChange={ (e)=> setIpAddress(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    )

}

export default EditGateway