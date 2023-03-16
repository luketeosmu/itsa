import React from 'react'
import NavBar from './NavBar'
import BankUsers from './BankUsers'
const MyBank = () => {
    const users = [ 
        {
            'email' : "kangchinshen@gmail.com",
            'uid' : "123456789zxc",
            'status' : "inactive",
            'actions' : "read/write"
        },
        {
            'email' : "chinshenkang@gmail.com",
            'uid' : "987654321abc",
            'status' : "active",
            'actions' : "read/write"
        },
        {
            'email' : "shenchinkang@gmail.com",
            'uid' : "0101010101jkl",
            'status' : "active",
            'actions' : "read/write"
        },
    ]
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
                            return <BankUsers user={user} key={i} />;
                        })}
                    </tbody>
                </table>
            </div>
            :
            <div class="flex items-center justify-center text-center text-2xl font-medium">
                No users to display
            </div>

        }
    </div>
  )
}

export default MyBank