import { Body, Controller, Post, UseInterceptors } from '@nestjs/common'
import { RegisterDTO } from './dto/register.dto';
import { UserService } from './services/user.service';
import { LoginDTO } from './dto/login.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from 'src/DTO/user.dto';

@UseInterceptors(new SerializeInterceptor(UserDTO))
@Controller('')
export class UserController {

    constructor(private _UserService: UserService) {}

    @Post('register')
    register(@Body() regForm: RegisterDTO) {
        return this._UserService.register(regForm)
    }

    @Post('login')
    login(@Body() loginForm: LoginDTO) {
        return this._UserService.login(loginForm)
    }

}
