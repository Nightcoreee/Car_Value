import { Entity, PrimaryGeneratedColumn, Column, AbstractRepository } from 'typeorm';

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}