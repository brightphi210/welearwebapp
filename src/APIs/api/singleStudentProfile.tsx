import { base_url } from "../base";
import { STUDENT_PROFILE_UPDATE, STUDENTPROFILE } from "../endpoints";

export interface UpdateProps {
    gender?: string;
    location?: string;
    profile_pic?: string
}
export const singleStudentProfileGet = (userId: number) => base_url.get(STUDENTPROFILE(userId))

export const singleStudentProfileUpdate = (userId: number, formData: FormData) =>
  base_url.patch(STUDENT_PROFILE_UPDATE(userId), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

// export const singleStudentProfileUpdate = (userId: number, formData: UpdateProps) =>base_url.patch(STUDENT_PROFILE_UPDATE(userId), formData)

