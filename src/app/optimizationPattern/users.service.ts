import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

export interface User {
  name: string,
  age: number
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.initializeUsers();
  }

  private initializeUsers(): void {
    for (let i = 0; i < 50; i++) {
      this.users.push(this.generateUser());
    }
  }

  private generateUser(): User {
    return {
      name: faker.name.fullName(),
      age: faker.datatype.number({ min: 18, max: 30 })
    };
  }

  getOddOrEven(isOdd = false): User[] {
    return this.users.filter(user => (user.age % 2 !== 0) === isOdd);
  }

  addUser(list: User[], name: string): void {
    const newUser = this.generateUserWithName(name);
    list.unshift(newUser);
  }

  private generateUserWithName(name: string): User {
    return {
      name,
      age: faker.datatype.number({ min: 18, max: 30 })
    };
  }
}
