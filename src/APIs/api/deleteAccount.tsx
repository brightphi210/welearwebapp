import { base_url } from "../base";
import { DELETE_ACCOUNT_ENDPOINT } from "../endpoints";


export const deleteAccount = (email: string) => base_url.post(DELETE_ACCOUNT_ENDPOINT, { email })