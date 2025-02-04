
// LOGIN
export const LOGIN_ENDPOINT = "/api/token/";


//INSTRUCTORS
export const INSTRUCTORSGET_ENDPOINT = "/api/instructor-profiles/"

//STUDENT PROFILE
export const STUDENTPROFILE = (id:number) =>`/api/student-profiles/update/${id}/`

//INSTRUCTOR GET ENDPOINT
export const SINGLE_INSTRUCTOR = (id:number)=> `/api/instructor-profiles/update/${id}/`

// LOGO ENDPOINT
export const LOGO_ENDPOINT = "/api/cms/logo/"

//FAQs
export const FAQS_ENDPOINT_GET = "/api/cms/faqs/"

//TESTOMINIES
export const TESTIMONIALS_ENDPOINT_GET = "/api/cms/testimonial/"