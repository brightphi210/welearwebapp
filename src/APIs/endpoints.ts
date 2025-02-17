
// LOGIN
export const LOGIN_ENDPOINT = "/api/token/";

export const SIGNUP_ENDPOINT = "/api/user/";


//INSTRUCTORS
export const INSTRUCTORSGET_ENDPOINT = "/api/instructor-profiles/"

//STUDENT PROFILE
export const STUDENTPROFILE = (id:number) =>`/api/student-profiles/update/${id}/`
export const STUDENT_PROFILE_UPDATE = (id:number) =>`/api/student-profiles/update/${id}/`

//INSTRUCTOR GET ENDPOINT
export const SINGLE_INSTRUCTOR = (id:number)=> `/api/instructor-profiles/update/${id}/`


// HIRING INSTRUCTOR ENDPOINT
export const HIRING_INSTRUCTOR_ENDPOINT = "/api/class-bookings/"

//REMARKS
export const STUDENT_REMARK = "/api/student-remarks/"
export const STUDENT_REMARK_POST = "/api/student-remarks/"

export const INSTRUCTOR_REMARK_GET = "/api/instructor-remarks/"
export const INSTRUCTOR_REMARK_POST = "/api/instructor-remarks/"


//PASSWORD UPDATE
export const STUDENT_PASSWORD_UPDATE = "/api/change-password/"
export const INSTRUCTOR_PASSWORD_UPDATE = "/api/change-password/"

//DELETE ACCOUNT
export const DELETE_ACCOUNT_ENDPOINT = "/api/delete-account/"