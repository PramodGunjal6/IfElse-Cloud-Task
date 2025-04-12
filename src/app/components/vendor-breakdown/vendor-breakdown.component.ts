import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-vendor-breakdown',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './vendor-breakdown.component.html',
  styleUrls: ['./vendor-breakdown.component.scss']
})
export class VendorBreakdownComponent {
  chartOptions: any = {
    series: [
      {
        name: 'High Security',
        data: [20, 30, 40, 50, 60, 70, 80, 90, 85, 75, 65, 55]
      },
      {
        name: 'Low Security',
        data: [10, 20, 15, 25, 20, 30, 25, 15, 20, 25, 30, 20]
      }
    ] as ApexAxisChartSeries,
    chart: { type: 'bar', height: 350, stacked: true, foreColor: '#6B46C1' } as ApexChart,
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] } as ApexXAxis,
    colors: ['#6B46C1', '#a0aec0'] as string[],
    plotOptions: { bar: { horizontal: false } } as ApexPlotOptions,
    legend: { show: false }
  };
}