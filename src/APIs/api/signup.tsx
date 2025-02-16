

import { SIGNUP_ENDPOINT } from "../endpoints";
import { base_url } from "../base";

export interface regitserProps {
    name: string;
    email: string;
    password: string;
    user_type: string;
}

export const signupPost = (payload : regitserProps) => base_url.post(SIGNUP_ENDPOINT, payload)


