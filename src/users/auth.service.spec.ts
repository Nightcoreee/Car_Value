import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
     //create a fake copy of users service
    //mocks
    fakeUsersService = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) => 
            Promise.resolve({ id: 1, email, password } as UserEntity),
    };


    const module = await Test.createTestingModule({
        providers: [AuthService, 
            { 
                provide: UsersService,
                useValue: fakeUsersService 
            }
        ],
    }).compile();

    service = module.get(AuthService);
});

    //Test case
    it('can create an instance of AuthService', async () => {
        expect(service).toBeDefined();
    });


    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('asdf@asdf.com', 'asdf');
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });


    it('throws an error if user signs up with email that is in use', async () => {
        fakeUsersService.find = () =>
        Promise.resolve([{ id: 1, email: 'a', password: '1' } as UserEntity]);
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
        BadRequestException,
        );
    });


    it('throws if signin is called with an unused email', async () => {
        await expect(
        service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
            ).rejects.toThrow(NotFoundException);
    });    

});


