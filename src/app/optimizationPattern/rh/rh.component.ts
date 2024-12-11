import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { UsersService, User } from '../users.service';
import { UserListComponent } from '../user-list/user-list.component';
import * as ChartJs from 'chart.js/auto';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UserListComponent],
})
export class RhComponent implements OnInit {
  oddUsers: User[] = [];
  evenUsers: User[] = [];
  chart: any;

  private userService = inject(UsersService);

  constructor() {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven(false);
  }

  ngOnInit(): void {
    this.createChart();
  }

  addUser(list: User[], newUser: string) {
    this.userService.addUser(list, newUser);
    this.updateChartData();
  }

  createChart(): void {
    const data = [
      { users: 'Workers', count: this.evenUsers.length },
      { users: 'Boss', count: this.oddUsers.length },
    ];

    this.chart = new ChartJs.Chart('MyChart', {
      type: 'bar',
      data: {
        labels: data.map((row) => row.users),
        datasets: [
          {
            label: 'Entreprise stats',
            data: data.map((row) => row.count),
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  updateChartData() {
    const data = [
      { users: 'Workers', count: this.evenUsers.length },
      { users: 'Boss', count: this.oddUsers.length },
    ];
  
    this.chart.data.datasets[0].data = data.map(row => row.count);
    this.chart.update();
  }
}
