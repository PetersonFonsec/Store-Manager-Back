import { Injectable } from '@nestjs/common';
import { IDashboard } from 'src/dashboard/interfaces/dashboard.interface';

@Injectable()
export class DashboardService {
  constructor() {}

  async get(): Promise<IDashboard> {
    return;
  }
}
