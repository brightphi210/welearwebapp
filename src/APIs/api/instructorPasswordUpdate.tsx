import { base_url } from "../base";
import { INSTRUCTOR_PASSWORD_UPDATE } from "../endpoints";


export interface InstructorPasswordUpdateProps {
    old_password: string
    new_password: string
    confirm_new_password: string
}
export const instructorPasswordUpdate = (formData: InstructorPasswordUpdateProps) =>base_url.put(INSTRUCTOR_PASSWORD_UPDATE, formData)