import { Injectable, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from '../dto/register.dto';
import { UserHelperService } from './user-helper.service';
import { LoginDTO } from '../dto/login.dto';
import {compareSync} from 'bcrypt';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private _UserRepository: Repository<UserEntity>,
        private _UserHelperService: UserHelperService
    ) {}

    async register(regForm: RegisterDTO) {
        const {email} = regForm
        const isEmailExist = await this._UserHelperService.EmailExist(email)
        if (isEmailExist) {
            throw new HttpException('Email Already Exist', HttpStatus.CONFLICT)
        }
        const newUser = this._UserRepository.create(regForm)
        const savedUser = await this._UserRepository.save(newUser)        
        if (!savedUser) {
            throw new InternalServerErrorException('Something Went Wrong Please Try Again')
        }
        return savedUser
    }

    async login(loginForm: LoginDTO) {
        const {email, password} = loginForm
        const user = await this._UserRepository.findOneBy({email})
        if (!user) {
            throw new HttpException('In-valid Credintials', HttpStatus.BAD_REQUEST)
        }
        if (!compareSync(password, user.password)) {
            throw new HttpException('In-valid Credintials', HttpStatus.BAD_REQUEST)
        }
        return user
    }
}
