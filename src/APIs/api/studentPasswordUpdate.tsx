import { base_url } from "../base";
import { STUDENT_PASSWORD_UPDATE } from "../endpoints";


export interface StudentUpdateProps {
    old_password: string
    new_password: string
    confirm_new_password: string
}
export const studentPasswordUpdate = (formData: StudentUpdateProps) =>base_url.put(STUDENT_PASSWORD_UPDATE, formData)