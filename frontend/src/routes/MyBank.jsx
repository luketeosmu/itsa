import React from 'react'
import NavBar from './NavBar'
import BankUsers from './BankUsers'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
const MyBank = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [role, setRole] = useState('user');
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

        const url = "https://3qhkw6bpzk.execute-api.ap-southeast-1.amazonaws.com/default/hosted_login_oauth_token";
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
        
        // const parseJwt = (token) => {
        //     var base64Url = token.split(".")[0];
        //     var base64 = decodeURIComponent(atob(base64Url).split('').map((c)=> {
        //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        //     }).join(''));

        //     return JSON.parse(base64);
        // }
        
        // console.log(signature);
        const postToAuthApp = () => {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    'auth_code' : searchParams.get('code'),
                    'code_verifier' : localStorage.getItem('code_verifier'),
                    'client_id' : 'cMZ8riSFzCrLUwDCkd3awhx5pFLURjW5th2aWfm13ws',
                    'client_secret' : 'PLT2bDFO0zU-8j1pADf-VqzZNMJqaQKyy0K-O5XMGPk'
                }),
                headers: {
                    'Content-type': 'application/json',
                },
            }).then(response => response.json())
            .then(data => {
                //access token + refresh token
                console.log(data)
                console.log("TEST 1: " + data["id_token"]);
                // replace with data.token or something idk whats the variable name
                // let token = JSON.parse(data);
                // console.log("TEST 2: " + token);
                let id_token = data["id_token"];
                // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
                // console.log(parseJwt(token["id_token"]));
                let parts = id_token.split(".");
                let header = JSON.parse(atob(parts[0]));
                let payload = JSON.parse(atob(parts[1]));
                // console.log(parts[2]);
                // // let signature = atob(parts[2]); //this token signature doesnt work idky
                console.log(header);
                console.log(payload.role);
                //idk whats the role variable name in the token 
                setRole(payload.role);
                if(role === "user") {
                    //GET own user details and setUsers() -> will be array of len 1 
                } else {
                    //GET all user details and setUsers()
                    //example:
                    setUsers(
                        [{
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
                        }])
                    }
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        postToAuthApp();
        
    }, [searchParams])

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
                        {
                            role !== "user" 
                            ?<th>Actions</th>
                            :<th></th>
                        } 
                    </tr>
                    </thead> 
                    <tbody>
                        {users.map(function(user, i){
                            return <BankUsers user={user} setUsers={setUsers} users={users} key={user.uid} role={role}/>;
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