import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, of } from 'rxjs';
import { UserEntity } from './model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private _UserRepository: Repository<UserEntity>) {}

    register(): Observable<any> {
        return of({
            email: 'ahmedyousry098@gmail.com',
            userName: 'ahmedyousry'
        })
    }
}
