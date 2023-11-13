
import Image from "next/image"
const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 max-w-[1440px] m-auto">
        <h1 className="text-3xl text-black p-2 font-bold">Home</h1>
        <div className="flex justify-center items-center p-2 space-x-4">
            <div className="flex flex-col justify-end items-end">
                <p className="text-sm font-bold tracking-wide">James Neesham</p>
                <small className="text-xs text-slate-400">Admin</small>
            </div>
            <img
            src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
            alt="image"
            className="object-cover rounded-full w-[40px] h-[40px]"
            />
        </div>
    </div>
  )
}

export default Navbar