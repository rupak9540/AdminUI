import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminUi from './components/AdminUi';
import Edit from './components/Edit';
import { getUsers } from './service/service'




const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getUsers(setData, setLoading, setError);
    }, []);
    // console.log(data);
    return (
        <div>


            <Router>

                <Routes>
                    <Route path="/" element={<AdminUi
                        data={data}
                        loading={loading}
                        error={error}
                        setData={setData}
                    />} />
                    <Route path="/edit" element={<Edit
                        data={data}
                        loading={loading}
                        error={error}
                        
                    />} />

                </Routes>
            </Router>
        </div>
    )
}

export default App;