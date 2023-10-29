import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn({})
    id: number

    @Column()
    username: string;

    @Column({unique: true})
    email: string

    @Column()
    password: string
    
    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase()
    }

    @BeforeInsert()
    async hashPassword() {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
        this.password = await bcrypt.hash(this.password, 10)
    }
}