import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { ReportsService } from './reports/reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [UserEntity],
    synchronize: true,
  })], 
  controllers: [AppController],
  providers: [AppService, UsersService, ReportsService],
})
export class AppModule {}
