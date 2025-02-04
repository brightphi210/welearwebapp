import { base_url } from "../base"
import { INSTRUCTORSGET_ENDPOINT, SINGLE_INSTRUCTOR } from "../endpoints"

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


export const instructorGetApi = (params?: InstructorProps) => base_url.get(INSTRUCTORSGET_ENDPOINT, { params })
export const singleInstructorGetApi = (userId: number) => base_url.get(SINGLE_INSTRUCTOR(userId))

