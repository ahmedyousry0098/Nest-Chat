import { Body, Controller, Post } from '@nestjs/common'
import { RegisterDTO } from './dto/register.dto';
import { UserService } from './user.service';
import { log } from 'console';
import { switchMap } from 'rxjs';

@Controller('user')
export class UserController {

    constructor(private _UserService: UserService) {}

    @Post('register')
    register(@Body() regForm: RegisterDTO) {
        return this._UserService.register().pipe(
            switchMap((val) => {
                log(val)
                return val
            })
        )
    }

}
