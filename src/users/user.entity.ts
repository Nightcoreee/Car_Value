import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";
import { Exclude } from 'class-transformer';
@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @AfterInsert() 
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Remove User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Update User with id', this.id);
    }

}
