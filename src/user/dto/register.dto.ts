import { IsString, IsEmail } from "class-validator";
import { LoginDTO } from "./login.dto";


export class RegisterDTO extends LoginDTO {
    @IsString()
    username: string;
}