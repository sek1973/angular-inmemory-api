import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PolicyService } from './policy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = Subscription.EMPTY;

  policies: any[] = [];

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.subscription = this.policyService.getPolicies()
      .subscribe((data: any[]) => {
        console.log(data);
        this.policies = data;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deletePolicy(policyId: any) {
    this.subscription = this.policyService.deletePolicy(policyId)
      .pipe(
        map((ret) => console.log("Policy deleted: ", ret)),
        switchMap(() => this.policyService.getPolicies()))
      .subscribe((data) => {
        console.log(data);
        this.policies = data as any[];
      });
  }


  public updatePolicy(policy: { id: number, amount: number, clientId: number, userId: number, description: string }) {
    let newPolicy: { id: number, amount: number, clientId: number, userId: number, description: string } =
      { ...this.policies[0] };
    newPolicy.description = 'Policy updated: ' + new Date().toLocaleTimeString();
    this.subscription = this.policyService.updatePolicy(newPolicy)
      .pipe(
        map((ret) => console.log("Policy updated: ", ret)),
        switchMap(() => this.policyService.getPolicies()))
      .subscribe((data) => {
        console.log(data);
        this.policies = data as any[];
      });
  }

  public createPolicy() {
    let newPolicy: { id: number, amount: number, clientId: number, userId: number, description: string } =
      { id: this.policies.length + 1, amount: 1, clientId: 1, userId: 1, description: 'New policy created: ' + new Date().toLocaleTimeString() }
    this.subscription = this.policyService.createPolicy(newPolicy)
      .pipe(
        map((ret) => console.log("Policy created: ", ret)),
        switchMap(() => this.policyService.getPolicies()))
      .subscribe((data) => {
        console.log(data);
        this.policies = data as any[];
      });
  }
}
