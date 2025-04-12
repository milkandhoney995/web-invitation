import { IFormInput } from "@/types/FormData";

export type GuestField = keyof IFormInput;
export type DynamicGuestField = `guests.${number}.${keyof IFormInput}`;