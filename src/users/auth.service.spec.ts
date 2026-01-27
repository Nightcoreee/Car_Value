import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: UserEntity[] = [];
    //create a fake copy of users service
    //mocks
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = ({id: Math.floor(Math.random() * 999999), email, password} as UserEntity);
                users.push(user);
                return Promise.resolve(user);
            }
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
    //TC1: Tạo instance của AuthService
    it('can create an instance of AuthService', async () => {
        //Kiểm tra xem service đã được định nghĩa chưa
        expect(service).toBeDefined();
    });

    //TC2: Tạo user phải hashed password
    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('asdf@asdf.com', 'asdf');
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    //TC3: Không thể tạo user với email đã tồn tại
    it('throws an error if user signs up with email that is in use', async () => {
        await service.signup('asdf@asdf.com', 'asdf');
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
            BadRequestException,
        );
  });

    //TC4: Không thể đăng nhập với email không tồn tại
    it('throws if signin is called with an unused email', async () => {
        await expect(
        service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
            ).rejects.toThrow(NotFoundException);
    });    

    //TC5: Không thể đăng nhập với mật khẩu sai
    it('throws if an invalid password is provided', async () => {
        await service.signup('laskdjf@alskdfj.com', 'password');
        await expect(
            service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
            ).rejects.toThrow(BadRequestException);
  });

    //TC6: Đăng nhập thành công với mật khẩu đúng
    it('returns a user if correct password is provided', async () => {
        await service.signup('asdf@asdf.com', 'password');

        const user = await service.signin('asdf@asdf.com', 'password');
        expect(user).toBeDefined();
    });
});


