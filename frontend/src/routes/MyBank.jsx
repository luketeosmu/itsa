import React from 'react'
import NavBar from './NavBar'
import BankUsers from './BankUsers'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
const MyBank = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [users, setUsers] = useState([
        // {
        //     'email' : "kangchinshen@gmail.com",
        //     'uid' : "123456789zxc",
        //     'status' : "inactive",
        //     'actions' : "read/write"
        // },
        // {
        //     'email' : "chinshenkang@gmail.com",
        //     'uid' : "987654321abc",
        //     'status' : "active",
        //     'actions' : "read/write"
        // },
        // {
        //     'email' : "shenchinkang@gmail.com",
        //     'uid' : "0101010101jkl",
        //     'status' : "active",
        //     'actions' : "read/write"
        // },
    ]);
  // TODO: save the access token to local storage/cookie/memory
    useEffect(() => {
        console.log(localStorage.getItem('code_verifier'));
        console.log(searchParams.get('code'));

        const url = "https:localhost:4000/oauth/token";
        //USING AXIOS METHOD
        const postToAuthApp = () => {
            let body = {
                'auth_code' : searchParams.get('code'),
                'code_verifier' : localStorage.getItem('code_verifier'),
                'client_id' : 'cMZ8riSFzCrLUwDCkd3awhx5pFLURjW5th2aWfm13ws',
                'client_secret' : 'PLT2bDFO0zU-8j1pADf-VqzZNMJqaQKyy0K-O5XMGPk'
            };
            axios.post(url, body)
                .then((response) => {
                    if(response.status === 200) {
                        getFromAuthApp();
                    }
                })
        };

        const getFromAuthApp = () => {
            axios.get(url)
                .then((response) => {
                    console.log(response.data);
                    // should return list of users
                    setUsers(response.data.users);
                }).catch((err) => {
                    console.log(err);
                }) 
        };

        postToAuthApp();
        //USING FETCH METHOD 
        // const postToAuthApp = () => {
        //     fetch('https:localhost:4000/oauth/token', {
        //         method: 'POST',
        //         body: JSON.stringify({
                    // 'auth_code' : searchParams.get('code'),
                    // 'code_verifier' : localStorage.getItem('code_verifier'),
                    // 'client_id' : 'cMZ8riSFzCrLUwDCkd3awhx5pFLURjW5th2aWfm13ws',
                    // 'client_secret' : 'PLT2bDFO0zU-8j1pADf-VqzZNMJqaQKyy0K-O5XMGPk'
        //         }),
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //     }).then(
        //         (response => {
        //             if (response.status === 200) {
        //                 getFromAuthApp();
        //             }
        //         })
        //     ).catch((err) => {
        //         console.log(err.message);
        //     });
        // }
        // const getFromAuthApp = () => {
        //     fetch('https:localhost:4000/oauth/token', {

        //     }).then(
        //         (response) => {
        //             setUsers(response.data.users);
        //         }
        //     ).catch((err) => {
        //         console.log(err.message);
        //     })
        // };
    }, [searchParams])

  return (
    <div>
        <NavBar />
        <h1 class='text-3xl mb-10 ml-56 font-bold'>
            My Bank
        </h1>
        {users.length > 0 ?
            <div class="overflow-x-auto h-screen ">
                <table class="table table-compact w-3/4 mx-auto">
                    <thead>
                    <tr>
                        <th>Email</th> 
                        <th>User ID</th> 
                        <th>Status</th> 
                        <th>Actions</th> 
                    </tr>
                    </thead> 
                    <tbody>
                        {users.map(function(user, i){
                            return <BankUsers user={user} key={user.uid} />;
                        })}
                    </tbody>
                </table>
            </div>
            :
            <div class="flex items-center justify-center text-center text-2xl font-medium">
                <button class="btn btn-ghost btn-xl loading text-xl">Loading bank users..</button>
            </div>

        }
    </div>
  )
}

export default MyBank