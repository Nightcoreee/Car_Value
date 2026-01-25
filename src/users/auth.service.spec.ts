import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';

let service: AuthService;

beforeEach(async () => {
     //create a fake copy of users service
    //mocks
    const fakeUsersService: Partial<UsersService> = {
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

//test case
it('can create an instance of AuthService', async () => {
   
    expect(service).toBeDefined();
});

