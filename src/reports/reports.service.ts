import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>) {}

    
    create(reportDto: CreateReportDto, user: UserEntity) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }
}
