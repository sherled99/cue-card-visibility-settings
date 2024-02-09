import { DTO_Message } from "./DTO_Message";

export class DTO_Chat {
    "chat": any;
    "channel": any;
    "contact": any;
    "relatedObject": any;
    "access": string;
    "messages": Array<DTO_Message>;
}