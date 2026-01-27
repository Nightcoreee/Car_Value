import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    //Create Mock Services
    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({ id:1, email, password } as UserEntity);
      },
      // signup: () => {}
    };

    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email:'asdf@asdf.com', password:'mypassword' } as UserEntity);
      },

      find: (email: string) => {
        return Promise.resolve([{ id:1, email, password:'mypassword' } as UserEntity]);
      },
      // remove: () => {},
      // update: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //TC1: Tìm user theo email
  it('findAllUser returns a user if user with given email is found', async () => {
    const users = await controller.findAllUser('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  //TC2: Tìm user theo id
  it('findUser returns a user if user with given id is found', async () => {
    const user = await controller.findUser('1');
    expect(user.id).toEqual(1);
    expect(user).toBeDefined();
  });

  //TC3: Tìm user theo id không tồn tại
  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  //TC4: Đăng nhập cập nhật session và trả về user
  it('signin updates session object and returns user', async () => {
    const session = { userId: 10 };
    const user = await controller.sigin(
      { email: 'asdf@asdf.com', password: 'mypassword' },
      session
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
