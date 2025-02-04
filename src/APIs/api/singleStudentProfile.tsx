import { base_url } from "../base";
import { STUDENTPROFILE } from "../endpoints";


export const singleStudentProfileGet = (userId: number) => base_url.get(STUDENTPROFILE(userId))