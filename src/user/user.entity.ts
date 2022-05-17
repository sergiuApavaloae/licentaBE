import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'user_id'})
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({nullable:true})
    password: string;

}
