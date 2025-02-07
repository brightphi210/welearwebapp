import { base_url } from "../base";
import { HIRING_INSTRUCTOR_ENDPOINT } from "../endpoints";


export interface HireProps {
    location: string;
    dayone: string;
    timeone: string;
    daytwo: string;
    timetwo: string;
    daythree: string;
    timethree: string;
    instructor?: number
    class_booked?: number
    student?: number
}

export const hiringPost = (payload : HireProps) => base_url.post(HIRING_INSTRUCTOR_ENDPOINT, payload)