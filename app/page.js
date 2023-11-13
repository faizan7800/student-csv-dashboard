'use client'
import {get, ref, remove} from 'firebase/database'
import { useState, useEffect } from 'react';
import { database } from './firebaseConfig';
import Navbar from '@/Components/Navbar';
import TableData from '@/Components/TableData';
export default function Home() {
  const [users, setUsers] = useState([])
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('csv', file);
    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        window.location.reload()
      } else {
        console.error('Failed to upload CSV');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



 useEffect(() => {
  const usersRef = ref(database, 'users');
  get(usersRef).then((snapshot)=>{
    if(snapshot.exists()){
      const usersArray = Object.entries(snapshot.val()).map(([id, data])=>({
        id,
        ...data
      }))
      setUsers(usersArray)
    }else{
      console.log("No data available")
    }

  }).catch((error)=>{
    console.log(error)
  })
 },[users])

 
  return (
    <>
    <Navbar/>
    <div className='my-4 flex justify-between items-center p-4 max-w-[1440px] m-auto'>
      <div></div>
     <div className='flex justify-center items-center'>
    <input className='text-[12px] bg-gray-200 mx-2 rounded outline-none p-2' type="file" accept=".csv" onChange={handleFileChange} />
    <button className='rounded p-2 bg-green-800 hover:bg-green-700 text-white' onClick={handleUpload}>Upload Data</button>
    </div>
    </div>
    <TableData/>
    {
      users.map((user)=>(
      <TableData key={user.id} num={parseFloat(user.id) + 1} id={user.id} name={user.Name} age={user.Age} phone={user.Phone} email={user.Email}/>
      ))
      }
    </>
  );
}
