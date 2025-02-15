import { useState } from 'react'
import { FAQs } from '@/Compnents/Mock/MockData'
import {Accordion} from '@brightcodeui/beta-ui';
import InstructorTopNavbar from './InstructorTopNavbar';
import InstructorSideBar from './InstructorSideBar';


const InstructorFAQs = () => {
      const [isOpened, setIsOpened] = useState(false)
      const toggleDrawer = () => setIsOpened(!isOpened)

  return (
    <div>  
        <div className='w-full'>
            <InstructorTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
            <InstructorSideBar isOpened={isOpened}/>

            <div className="lg:pt-28 pt-24 h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5 overflow-y-scroll">
                <h1 className="text-3xl font-bold text-center mt-5">Frequently Asked Questions</h1>

                <div className='flex flex-col gap-5 pt-10'>
                    {FAQs.map((faq)=>(
                        <Accordion 
                            title={faq?.question} 
                            content={faq?.answer}
                            type="plus" 
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorFAQs