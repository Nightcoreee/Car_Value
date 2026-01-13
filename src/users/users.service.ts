import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}
    
    //Create User
    create(email: string, password: string) {
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    //Find User with id
    findOne(id: number) {
        return this.repo.findOneBy({id});
    }

    //Find User
    find(email: string) {
        return this.repo.find({ where: {email }});
    }

    //Update User
    async update(id: number, attrs: Partial<UserEntity>) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    //Remove User
    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return this.repo.remove(user);
    }
}
