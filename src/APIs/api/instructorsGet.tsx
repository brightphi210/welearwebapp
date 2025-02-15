import { base_url } from "../base"
import { INSTRUCTORSGET_ENDPOINT, SINGLE_INSTRUCTOR, STUDENTPROFILE } from "../endpoints"

interface UserProps {
  id: number
  email: string
  name: string
  user_type: string
  profile_pic: string
}

interface InstructorProps {
  id: number
  classes: []
  instructorRemark: []
  allBookings: [] 
  occupation: string | null
  years_of_experience: string
  location: string
  profile_pic: string
  is_verified: boolean
  is_hired: boolean
  number_of_trained_students: number | null
  gender: string
  dob: string | null
  bio_data: string
  LGA: string
  state: string
  user: UserProps
}


export interface UpdateInstrutorProps {
  name: string;
  location: string;
  years_of_experience	: string;
  gender: string;
  bio_data: string;
  LGA: string;
  state: string;
  profile_pic: string;
}

export const instructorGetApi = (params?: InstructorProps) => base_url.get(INSTRUCTORSGET_ENDPOINT, { params })
export const singleInstructorGetApi = (userId: number) => base_url.get(SINGLE_INSTRUCTOR(userId))
export const singleStudentGetApi = (userId: number) => base_url.get(STUDENTPROFILE(userId))


export const singleInstructorUpdateApi = (userId: number, formData: FormData) =>
  base_url.patch(SINGLE_INSTRUCTOR(userId), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })


// export const singleInstructorUpdateApi = (userId: number, formData: UpdateInstrutorProps) => base_url.patch(SINGLE_INSTRUCTOR(userId), formData)

