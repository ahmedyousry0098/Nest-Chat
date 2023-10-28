import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'User'})
export class UserEntity {
    @PrimaryGeneratedColumn({type: 'int'})
    id: number

    @Column({type: "varchar"})
    username: string;

    @Column({type: 'varchar',unique: true})
    email: string

    @Column({type: 'varchar', select: false})
    password: string
    
    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase()
    }
}