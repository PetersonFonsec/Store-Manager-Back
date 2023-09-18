import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../../../auth/guards/jwt-auth.guard';
import { IDashboard } from './../../interfaces/dashboard.interface';
import { DashboardService } from './../../../dashboard/services/dashboard/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getDashboardData(): any {
    return this.dashboardService.getDashboard();
  }
}
