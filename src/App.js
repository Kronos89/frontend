import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowGateways from "./Gateway/ShowGateways";
import CreateGateway from "./Gateway/CreateGateway";
import EditGateway from "./Gateway/EditGateway";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ < ShowGateways />} />
                    <Route path='/create' element={ < CreateGateway />} />
                    <Route path='/edit/:serial' element={ < EditGateway />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
