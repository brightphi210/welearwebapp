import type React from "react"
import { useState } from "react"
import InstructorTopNavbar from "../access/instructor/InstructorTopNavbar"
import InstructorSideBar from "../access/instructor/InstructorSideBar"

const CustomerCare2: React.FC = () => {
  const whatsappNumber = "+1234567890"
  const whatsappMessage = encodeURIComponent("Hello, I need assistance.")
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    const [isOpened, setIsOpened] = useState(false)
    const toggleDrawer = () => setIsOpened(!isOpened)

  return (
    <div>
        <div className='w-full'>
            <InstructorTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
            <InstructorSideBar isOpened={isOpened}/>

            <div className="lg:pt-28  h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-2 overflow-y-scroll">

                <div className="flex flex-col items-center lg:mt-[10rem] mt-[12rem] p-4 ">
                    <div className="bg-white rounded-lg lg:p-8 lg:!w-[60%] w-full">
                        <h1 className="lg:text-3xl text-2xl font-bold text-center mb-6 text-sky-900">Contact Customer Care</h1>

                        <p className="text-gray-600 mb-6 text-center w-full">
                            We're here to help! Connect with our customer support team instantly via WhatsApp.
                        </p>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex lg:!w-[50%] w-full justify-center m-auto bg-sky-400 hover:bg-sky-500 text-sm rounded-full text-white font-bold py-3 px-4 text-center transition duration-300 mb-6"
                        >
                            Chat on WhatsApp
                        </a>

                        <div className="text-gray-600 text-center">
                        <p className="mb-2">Or reach us at:</p>
                        <p className="font-semibold">support@example.com</p>
                        <p className="font-semibold">+1 (234) 567-8900</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomerCare2

