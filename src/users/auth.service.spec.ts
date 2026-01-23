import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

//test case
it('can create an instance of AuthService', async () => {
    //create a fake copy of users service
    const fakeUsersService = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } ),
    };


    const module = await Test.createTestingModule({
        providers: [AuthService, 
            { 
                provide: UsersService,
                useValue: fakeUsersService 
            }
        ],
    }).compile();

    const service = module.get(AuthService);
    expect(service).toBeDefined();
});

