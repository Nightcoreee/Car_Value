import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>,
    ) {}

    
    create(reportDto: CreateReportDto) {
        const report = this.repo.create(reportDto);
        return this.repo.save(report);
    }
}
