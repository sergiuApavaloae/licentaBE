import { Optional } from "@nestjs/common";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Pin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable:true})
    @Optional()
    userId: string;

    @Column({nullable:true})
    @Optional()
    type: string;

    @Column({nullable:true})
    latitude: string;

    @Column({nullable:true})
    longitude: string;

    @Column({nullable:true})
    @Optional()
    description: string;

    @Column({nullable:true})
    @Optional()
    image3d: string;


}
