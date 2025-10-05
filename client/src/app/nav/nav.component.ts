import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  knownAs: string = this.accountService.currentUser()?.knownAs ?? '';

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/auth");
  }
}
