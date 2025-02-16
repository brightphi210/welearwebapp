import { Link } from "react-router-dom"

const SelectUser = () => {
  return (
    <div className="min-h-screen justify-center m-auto items-center flex px-10">
        <div className="lg:!w-[30%] w-full">
            <h2 className="text-base font-semibold text-center">Select the role below</h2>
            <p className="text-3xl pt-2 pb-5 font-semibold text-center">Join us as</p>
            <div className='flex lg:flex-row justify-center w-full flex-col gap-4'>
                <Link to={'/register/tutor'}>
                    <button className='font-semibold p-7 !w-full px-10 text-lg flex items-center justify-center border border-[#00C0EA] 
                        rounded-xl text-[#00C0EA] hover:bg-[#00C0EA] hover:text-white transition-all ease-linear delay-100'>
                        Tutor
                    </button>
                </Link>

                <Link to={'/register/parent'}>
                    <button className='font-semibold p-7 !w-full px-10 text-lg flex items-center justify-center border border-[#00C0EA] 
                        rounded-xl text-[#00C0EA] hover:bg-[#00C0EA] hover:text-white transition-all ease-linear delay-100'>
                        Parent
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SelectUser