import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  getStart() {
    if (this.accountService.currentUser()) {
      return this.router.navigateByUrl('/todos');
    } else {
      return this.router.navigateByUrl('/auth');
    }
  }
}
