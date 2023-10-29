import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserHelperService {
    constructor(
        @InjectRepository(UserEntity) private _UserRepository: Repository<UserEntity>
    ){}

    public async EmailExist(email: string) {
        const isExist = await this._UserRepository.findOneBy({email})
        return isExist
    }

    
}
