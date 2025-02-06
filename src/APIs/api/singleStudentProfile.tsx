import { base_url } from "../base";
import { STUDENT_PROFILE_UPDATE, STUDENTPROFILE } from "../endpoints";

export interface UpdateProps {
    gender: string;
    location: string;
}
export const singleStudentProfileGet = (userId: number) => base_url.get(STUDENTPROFILE(userId))
export const singleStudentProfileUpdate = (userId: number, formData: UpdateProps) =>base_url.patch(STUDENT_PROFILE_UPDATE(userId), formData)

