import React from 'react'
import {useState, useEffect} from 'react';
const BankUsers = ({ user, setUsers, users, role }) => {
    // const [currentUser, setCurrentUser] = useState(user);
    const [currentUser, setCurrentUser] = useState();
    const [email, setEmail] = useState(user.email);
    const [given_name, setGivenName] = useState(user.given_name);
    const [family_name, setFamilyName] = useState(user.family_name);
    useEffect (() => {
        // setCurrentUser(user);
    }, [])
    const upperCase = (name) => {
        const words = name.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" ");
    }
    const editUser = () => {
        // console.log(id);
        console.log(email);
        console.log(given_name);
        console.log(family_name);
        let editedUser = 
            {
                'email' : email,
                'given_name' : given_name,
                'family_name' : family_name,
                'id' : user.id,
                'status' : user.status
            }
        let usersArr = [editedUser];
        console.log(usersArr);
        console.log(users.map(obj => usersArr.find(o => o.id === obj.id) || obj));
        let newUsers = users.map(obj => usersArr.find(o => o.id === obj.id) || obj);
        setUsers(newUsers);
        // confirmChange();
        // const url = "https://3qhkw6bpzk.execute-api.ap-southeast-1.amazonaws.com/default/hosted_login/oauth/updateuser";
        // fetch(url, {
        //     method: "PUT",
        //     body: JSON.stringify({
        //         "email": email,
        //         "id": currentUser.id,
        //         "given_name": given_name, 
        //         "family_name" : family_name
        //     })
        // }).then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // })
    }
    const confirmChange = () => {
        console.log("given name in confirm change: " + given_name);
        setCurrentUser(
            {
                'email' : email,
                'given_name' : given_name,
                'family_name' : family_name,
                'id' : user.id,
                'status' : user.status
            }
        )
        let usersArr = [currentUser];
        console.log(usersArr);
        console.log(users.map(obj => usersArr.find(o => o.id === obj.id) || obj));
        //TODO: POST new users arr to backend 
        
    }
    return (
        <tr>
            <td>{user.email}</td> 
            <td>{upperCase(user.given_name)}</td> 
            <td>{upperCase(user.family_name)}</td> 
            <td>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{ user.id }</span>
            </td> 
            {user.status === 'active' ?
                <td className='status-active'>{ user.status }</td> 
                :
                <td className='status-inactive'>{ user.status }</td> 
            }
            {role === 'superadmin' ?
                <td className='flex'>
                    <label for={'modal-read-user' + user.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6 mr-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                    </label>
                    <input type="checkbox" id={'modal-read-user' + user.id} class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box relative bg-indigo-100">
                            <label for={'modal-read-user' + user.id} class="btn btn-sm btn-circle absolute right-2 top-2 bg-black-500">✕</label>
                            <table className='border-separate border-spacing-y-3 border-inherit bg-indigo-100'>
                                <tr className='bg-indigo-100 font-medium'>
                                    <td className=' bg-indigo-100'>
                                        Email:
                                    </td>
                                    <td className='bg-indigo-100'>
                                        <h1 type="text" class="text-md">{user.email}</h1> 
                                    </td>
                                </tr>
                                <tr className='bg-indigo-100 font-medium'>
                                    <td className=' bg-indigo-100'>
                                        First Name:
                                    </td>
                                    <td className='bg-indigo-100'>
                                        <h1 type="text" class="text-md font-medium">{upperCase(user.given_name)}</h1> 
                                    </td>
                                </tr>
                                <tr className='bg-indigo-100 font-medium'>
                                    <td className=' bg-indigo-100'>
                                        Last Name:
                                    </td>
                                    <td className='bg-indigo-100'>
                                        <h1 type="text" class="text-md font-medium">{upperCase(user.family_name)}</h1> 
                                    </td>
                                </tr>
                            </table>
                            
                        </div>
                    </div>
                    <label for={'modal-edit-user' + user.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </label>
                    <input type="checkbox" id={'modal-edit-user' + user.id} class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box bg-indigo-100 absolute pb-5">
                            <label for={'modal-edit-user' + user.id} class="btn btn-sm btn-circle absolute right-2 top-2 bg-black-500">✕</label>
                                {/* <table className='border-separate border-spacing-y-3 border-inherit bg-indigo-100'>
                                    <tr className='bg-indigo-100'>
                                        <th className=' bg-indigo-100'>
                                            Email:
                                        </th>
                                        <td className='bg-indigo-100'>
                                            <input type="text" class="input input-bordered w-full max-w-xs" value={email} onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}/>
                                        </td>
                                    </tr>
                                    <tr className='bg-indigo-100'>
                                        <th className=' bg-indigo-100'>
                                            First Name:
                                        </th>
                                        <td className='bg-indigo-100'>
                                            <input type="text" class="input input-bordered w-full max-w-xs" value={upperCase(given_name)} onChange={(e) => {
                                                setGivenName(upperCase(e.target.value))
                                            }}/>
                                        </td>
                                    </tr>
                                    <tr className='bg-indigo-100'>
                                        <th className='bg-indigo-100'>
                                            Last Name:
                                        </th>
                                        <td className='bg-indigo-100'>
                                            <input type="text" class="input input-bordered w-full max-w-xs" value={upperCase(family_name)} onChange={(e) => {
                                                setFamilyName(upperCase(e.target.value))
                                            }}/>
                                        </td>
                                    </tr>
                                </table> */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div class="form-control w-full mb-3 col-span-2">
                                        <label class="label">
                                            <span class="label-text">Email:</span>
                                        </label>
                                        <input type="text" value={email} class="input input-bordered w-full max-w-xs" onChange={(e)=> {setEmail(e.target.value)}}/>
                                    </div>
                                    <div class="form-control w-full mb-5 col-span-1">
                                        <label class="label">
                                            <span class="label-text">Given Name:</span>
                                        </label>
                                        <input type="text" value={given_name} class="input input-bordered w-full max-w-xs" onChange={(e) => {setGivenName(e.target.value)}} />
                                    </div>
                                    <div class="form-control w-full mb-5 col-span-1">
                                        <label class="label">
                                            <span class="label-text">Family Name:</span>
                                        </label>
                                        <input type="text" value={family_name} class="input input-bordered w-full max-w-xs" onChange={(e) => {setFamilyName(e.target.value)}} />
                                    </div>
                                </div>
                                <label for={'modal-edit-user' + user.id} className="btn bg-indigo-600 mx-auto flex" onClick={editUser}>Confirm Changes</label>
                                {/* <button value="Confirm Changes" className='btn bg-indigo-600 mx-auto flex' id={'modal-edit-user' + user.id} onClick={editUser}/>  */}
                        </div>
                    </div>
                </td> 
            : role === "admin" ?
                <td className='flex justify-center'>
                    <label for={'modal-read-user' + user.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6 mr-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                    </label>
                    <input type="checkbox" id={'modal-read-user' + user.id} class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box relative bg-indigo-100">
                            <label for={'modal-read-user' + user.id} class="btn btn-sm btn-circle absolute right-2 top-2 bg-black-500">✕</label>
                            <table className='border-separate border-spacing-y-3 border-inherit bg-indigo-100'>
                                <tr className='bg-indigo-100 font-medium'>
                                    <td className=' bg-indigo-100'>
                                        Email:
                                    </td>
                                    <td className='bg-indigo-100'>
                                        <h1 type="text" class="text-md">{user.email}</h1> 
                                    </td>
                                </tr>
                                <tr className='bg-indigo-100 font-medium'>
                                    <td className=' bg-indigo-100'>
                                        First Name:
                                    </td>
                                    <td className='bg-indigo-100'>
                                        <h1 type="text" class="text-md font-medium">{upperCase(user.given_name)}</h1> 
                                    </td>
                                </tr>
                                <tr className='bg-indigo-100 font-medium'>
                                    <td className=' bg-indigo-100'>
                                        Last Name:
                                    </td>
                                    <td className='bg-indigo-100'>
                                        <h1 type="text" class="text-md font-medium">{upperCase(user.family_name)}</h1> 
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </td> 
            : <td></td>
            }
        </tr>
    )
}

export default BankUsers
