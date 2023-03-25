import React from 'react'
import NavBar from './NavBar'
import BankUsers from './BankUsers'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
const MyBank = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [users, setUsers] = useState([
        {
            'email' : "kangchinshen@gmail.com",
            'firstName' : 'kang',
            'lastName' : 'chin shen',
            'uid' : "123456789zxc",
            'status' : "inactive",
            'actions' : "read/write"
        },
        {
            'email' : "chinshenkang@gmail.com",
            'firstName' : 'chin',
            'lastName' : 'shen kang',
            'uid' : "987654321abc",
            'status' : "active",
            'actions' : "read/write"
        },
        {
            'email' : "shenchinkang@gmail.com",
            'firstName' : 'shen',
            'lastName' : 'chin kang',
            'uid' : "0101010101jkl",
            'status' : "active",
            'actions' : "read/write"
        },
    ]);
  // TODO: save the access token to local storage/cookie/memory
    useEffect(() => {
        console.log(localStorage.getItem('code_verifier'));
        console.log(searchParams.get('code'));

        const url = "/default/hosted_login_oauth_token";
        //USING AXIOS METHOD
        // const postToAuthApp = () => {
        //     console.log('posting to auth app');
        //     let body = {
        //         'auth_code' : searchParams.get('code'),
        //         'code_verifier' : localStorage.getItem('code_verifier'),
        //         'client_id' : 'cMZ8riSFzCrLUwDCkd3awhx5pFLURjW5th2aWfm13ws',
        //         'client_secret' : 'PLT2bDFO0zU-8j1pADf-VqzZNMJqaQKyy0K-O5XMGPk'
        //     };
        //     axios.post(url, body)
        //         .then((response) => {
        //             console.log(response);
        //             if(response.status === 200) {
        //                 console.log(response.data)
        //                 getFromAuthApp();
        //             }
        //         })
        // };

        // const getFromAuthApp = () => {
        //     axios.get(url)
        //         .then((response) => {
        //             console.log(response.data);
        //             // should return list of users
        //             setUsers(response.data.users);
        //         }).catch((err) => {
        //             console.log(err);
        //         }) 
        // };

        
        // USING FETCH METHOD 
        const getFromAuthApp = () => {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=1.431630&lon=103.785591&appid=3f0b9743df8cd6169d5a696a8fd7e0b6', {

            }).then(
                (response) => {
                    console.log(response.data);
                }
            ).catch((err) => {
                console.log(err.message);
            })
        };
        getFromAuthApp();
        // const postToAuthApp = () => {
        //     fetch(url, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             'auth_code' : searchParams.get('code'),
        //             'code_verifier' : localStorage.getItem('code_verifier'),
        //             'client_id' : 'cMZ8riSFzCrLUwDCkd3awhx5pFLURjW5th2aWfm13ws',
        //             'client_secret' : 'PLT2bDFO0zU-8j1pADf-VqzZNMJqaQKyy0K-O5XMGPk'
        //         }),
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //     }).then(
        //         (response => {
        //             console.log(response);
        //             if (response.status === 200) {
        //                 getFromAuthApp();
        //             }
        //         })
        //     ).catch((err) => {
        //         console.log(err.message);
        //     });
        // }
        // postToAuthApp();
        
    }, [users])

  return (
    <div>
        <NavBar />
        <h1 className='text-3xl mb-10 ml-56 font-bold'>
            My Bank
        </h1>
        {users.length > 0 ?
            <div className="overflow-x-auto h-screen ">
                <table className="table table-compact w-3/4 mx-auto">
                    <thead>
                    <tr>
                        <th>Email</th> 
                        <th>First Name</th> 
                        <th>Last Name</th> 
                        <th>User ID</th> 
                        <th>Status</th> 
                        <th>Actions</th> 
                    </tr>
                    </thead> 
                    <tbody>
                        {users.map(function(user, i){
                            return <BankUsers user={user} setUsers={setUsers} users={users} key={user.uid}/>;
                        })}
                    </tbody>
                </table>
            </div>
            :
            <div className="flex items-center justify-center text-center text-2xl font-medium">
                <button className="btn btn-ghost btn-xl loading text-xl">Loading bank users..</button>
            </div>

        }
    </div>
  )
}

export default MyBank