import { base_url } from "../base";
import { STUDENT_REMARK, STUDENT_REMARK_POST } from "../endpoints";


export interface RemarkProps {
    student?: number;
    content?: string;
    instructor?: number;
    booked_clasd?: number;
}



export const studentRemarksGet = () =>base_url.get(STUDENT_REMARK) 
export const studentRemarksPost = (formData: RemarkProps) => base_url.post(STUDENT_REMARK_POST, formData)  // formData should contain studentId and remark text.
