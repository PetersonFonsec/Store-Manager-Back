import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IDashboard } from 'src/dashboard/interfaces/dashboard.interface';
import { DashboardService } from 'src/dashboard/services/dashboard/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  getDashboardData(): any {
    return this.dashboardService.getDashboard();
  }
}
