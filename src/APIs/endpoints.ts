
// LOGIN
export const LOGIN_ENDPOINT = "/api/token/";


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

//TESTOMINIES
export const TESTIMONIALS_ENDPOINT_GET = "/api/cms/testimonial/"