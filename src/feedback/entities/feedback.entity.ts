import { Optional } from "@nestjs/common";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

@Entity()
export class Feedback extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable:true})
    @Optional()
    userId: string;

    @Column({nullable:true})
    @Optional()
    pinId: string;

    @Column({nullable:true})
    @Optional()
    text: string;

    @Column({nullable:true})
    @Optional()
    rating: number;

}
