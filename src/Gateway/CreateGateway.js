//importing axios useState useNavigate
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

//URL of node-app
const URI = process.env.NESTJS

//Create Gateway
const CreateGateway = () => {
    const [serialNumber, setSerialNumber] = useState('')
    const [name, setName] = useState('')
    const [ipAddress, setIpAddress] = useState('')
    const [peripherals, setPeripherals] = useState([])
    const [uid, setUid] = useState('')
    const [vendor, setVendor] = useState('')
    const [status, setStatus] = useState('online')
    const navigate = useNavigate()

    const addPeripheral = () => {
        const newPeripheral = {
            uid: uid,
            vendor: vendor,
            status: status
        }
        setPeripherals([...peripherals, newPeripheral])
        setUid('')
        setVendor('')
        setStatus('online')
    }

    const removePeripheral = (index) => {
        const newPeripherals = [...peripherals]
        newPeripherals.splice(index, 1)
        setPeripherals(newPeripherals)
    }

    const store = async (e) => {
        e.preventDefault();

        try {
            await axios.post(URI, {
                serialNumber: serialNumber,
                name: name,
                ipAddress: ipAddress,
                peripherals: peripherals
            });

            Swal.fire({
                icon: 'success',
                title: 'Gateway created successfully!',
                showConfirmButton: false,
                timer: 2500
            });

            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        }
    }

    return (
        <div className="container">
            <div className="row-cols-4">
                <h3>Create GATEWAY</h3>
                <form onSubmit={store}>
                    <div className="mb-3">
                        <label htmlFor="serialNumber" className="form-label">Serial Number</label>
                        <input
                            value={serialNumber}
                            onChange={ (e)=> setSerialNumber(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            value={name}
                            onChange={ (e)=> setName(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ipAddress" className="form-label">Ip Address</label>
                        <input
                            value={ipAddress}
                            onChange={ (e)=> setIpAddress(e.target.value)}
                            type="text"
                            className='form-control'
                            placeholder="1.1.1.1"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="peripherals" className="form-label">Peripherals</label>
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="uid" className="form-label">UID</label>
                                <input
                                    value={uid}
                                    onChange={ (e)=> setUid(e.target.value)}
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="vendor" className="form-label">Vendor</label>
                                <input
                                    value={vendor}
                                    onChange={ (e)=> setVendor(e.target.value)}
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className='form-select'
                                >
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type='button' className='btn btn-primary mt-3' onClick={addPeripheral}>Add Peripheral</button>
                            </div>
                        </div>
                        <div className="row">
                            {peripherals.map((p, index) => (
                                <div key={index} className="col-md-6">
                                    <div className="card mt-6">
                                        <div className="card-body">
                                            <p>UID: {p.uid}</p>
                                            <p>Vendor: {p.vendor}</p>
                                            <p>Status: {p.status}</p>
                                            <button type='button' className='btn btn-danger' onClick={() => removePeripheral(index)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateGateway