import { Optional } from "@nestjs/common";
import { IsNumber } from "class-validator";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

@Entity()
export class Feedback extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    pinId: string;

    @Column()
    @IsNumber()
    rating: number;

}
