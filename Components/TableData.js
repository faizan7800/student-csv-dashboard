import { remove, ref, update } from "firebase/database"
import { database } from "@/app/firebaseConfig"
import { useState } from "react"
const TableData = ({num,id, name, age, phone, email}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [newName, setName] = useState("")
  const [newAge, setAge] = useState("")
  const [newEmail, setEmail] = useState("")
  const [newPhone, setPhone] = useState("")
  const handleDelete = (id)=>{
    remove(ref(database, `/users/${id}`))
  }

  const handleSave = (id)=>{

    update(ref(database, `/users/${id}`),{
      Age:newAge,
      Email:newEmail,
      Name:newName,
      Phone:newPhone
    })
  }
  return (
    <>
    {
        name ? 
       ( <div className='grid grid-cols-12 items-start p-4 my-2 ring-1 ring-slate-300 max-w-[1440px] m-auto rounded-lg'>
        <p className='col-span-1 max-sm:text-xs'>{num}</p>
        {
          isEdit ?
          <>
          <input type="text" placeholder="Enter Name" className='col-span-4 text-sm outline-1 outline-slate-300' value={newName} onChange={(e)=>setName(e.target.value)}/>
          <input type="text" placeholder="Enter Age" className='col-span-1 text-sm outline-1 outline-slate-300 ' value={newAge} onChange={(e)=>setAge(e.target.value)}/>
          <input type="text" placeholder="Enter Email" className='col-span-2 text-sm outline-1 outline-slate-300 ' value={newEmail} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="text" placeholder="Enter Phone" className='col-span-2 text-sm outline-1 outline-slate-300 ' value={newPhone} onChange={(e)=>setPhone(e.target.value)}/></>
          : (
            <>
            <p className='col-span-4 max-sm:col-span-2 max-sm:text-xs '>{name}</p>
          <p className='col-span-1 bg-[#F67070] w-fit rounded-lg px-2 py-1 max-sm:text-xs text-white'>{age}</p>
          <p className='col-span-2 max-sm:col-span-4 max-sm:text-xs overflow-hidden'>{email}</p>
          <p className='col-span-2 max-sm:text-xs'>{phone}</p></>
        )
        
        }
        <p className='col-span-2 flex justify-center items-center space-x-2'>
            <button className='rounded-lg bg-red-600 hover:bg-red-500 p-2 text-sm text-white max-sm:text-xs max-sm:p-1' onClick={()=> handleDelete(id)}>Delete</button>
           {isEdit ? (
            <>
            <button className='rounded-lg bg-green-600 hover:bg-green-500 p-2 text-sm text-white max-sm:text-xs max-sm:p-1' onClick={
              ()=>{
              handleSave(id) 
              setIsEdit(false)}}>Save</button>
            <button className='rounded-lg bg-yellow-600 hover:bg-yellow-500 p-2 text-sm text-white max-sm:text-xs max-sm:p-1' onClick={()=> setIsEdit(false)}>×</button>
            </>
           ) : <button className='rounded-lg bg-blue-600 hover:bg-blue-500 p-2 text-sm text-white max-sm:text-xs max-sm:p-1' onClick={()=>setIsEdit(true)}>Edit</button>}
        </p>
    </div>):(
        <div className='grid grid-cols-12 items-start p-4 bg-[#F8F9FF] ring-1 ring-slate-300 max-w-[1440px] m-auto rounded-lg'>
        <p className='col-span-1 font-bold'>#</p>
        <p className='col-span-4 font-bold'>Name</p>
        <p className='col-span-1 font-bold'>Age</p>
        <p className='col-span-2 font-bold'>Email</p>
        <p className='col-span-2 font-bold'>Phone</p>
        <p className='col-span-2 font-bold text-center'>Options</p>
    </div>
    )
}
</>
  )
}

export default TableData