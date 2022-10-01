import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Edit = (props) => {


   const {data,loading,error} = props;
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Role, setRole] = useState('');
    const [id, setId] = useState("")
    const history = useNavigate();


   
  

    var index = data.map((e) => {
        return e.id
    }).indexOf(id);


    const handlesubmit = (e) => {
        e.preventDefault();
        let a = data[index];
        console.log(a.id);
        console.log(Name);
        a.name = Name;
        a.email = Email;
        a.role = Role;
        console.log(data);


        history("/");
    }
    useEffect(() => {
        setName(localStorage.getItem('Name'));
        setEmail(localStorage.getItem('Email'));
        setRole(localStorage.getItem('Role'));
        setId(localStorage.getItem('Id'));
    }, []);

    return (
        <div className='container mt-4 '>

            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}

            <form>
                <div className="form-group">
                    <label >User Name</label>
                    <input type="text" className="form-control" id="" placeholder="username"
                        name='name'
                        required
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                        name='email'
                        required
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div className="form-group">
                    <label>Role</label>
                    <input type="text" className="form-control" placeholder="role"
                        name='role'
                        required
                        value={Role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                </div>

                <div className='mt-3'>
                    <button type="submit" className="btn btn-primary" onClick={(e) => handlesubmit(e)}>Update</button>
                </div>

            </form>
        </div>
    )
}

export default Edit
