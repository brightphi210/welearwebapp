

import { base_url } from "../base";
import { INSTRUCTOR_REMARK_POST, INSTRUCTOR_REMARK_GET, } from "../endpoints";


export interface RemarkProps {
    student?: number;
    content?: string;
    instructor?: number;
    booked_clasd?: number;
}



export const instructorRemarksGet = () =>base_url.get(INSTRUCTOR_REMARK_GET) 
export const instructorRemarksPost = (formData: RemarkProps) => base_url.post(INSTRUCTOR_REMARK_POST, formData)  // formData should contain studentId and remark text.
