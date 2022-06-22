import { IsEmail, IsNotEmpty } from "class-validator";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'user_id'})
    id: string;

    @Column()
    name: string;

    @IsEmail()
    @Column({
        unique: true
      })
    email: string;


    @IsNotEmpty()
    @Column()
    password: string;

    @Column({nullable:true})
    scor: number;

}


