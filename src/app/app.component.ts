import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, of, Subscription } from 'rxjs';
import { delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { PolicyService } from './policy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = Subscription.EMPTY;

  policies: any[] = [];

  constructor(private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.subscription.unsubscribe();
    this.subscription = this.policyService.getPolicies()
      .subscribe((data: any[]) => {
        console.log(data);
        this.policies = data;
      })
    from([1, 2, 3])
      .pipe(
        map((val: number) => {
          const newVal = val + 1;
          return newVal;
        }),
        map(val => val - 1),
        mergeMap(val => of(val)),
        delay(1))
      .subscribe({
        next: (val: number) => console.log(val),
        complete: () => console.log('complete'),
        error: err => console.error(err)
      });
    console.log('test...');
    this.test();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deletePolicy(policyId: any) {
    this.subscription.unsubscribe();
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
    this.subscription.unsubscribe();
    this.subscription = this.policyService.updatePolicy(newPolicy)
      .pipe(
        map((ret) => console.log("Policy updated: ", ret)),
        switchMap(() => this.policyService.getPolicies()))
      .subscribe((data) => {
        console.log(data);
        this.policies = data as any[];
      });
  }

  spread(...values: string[]): void {
    const result = values; // array of string
  }

  noSpread(values: string[]): void {
    const result = values; // array of string
  }

  test(): void {
    this.spread('a', 'b');
    this.spread(...['a', 'b']);
    this.noSpread(['a', 'b']);
    this.noSpread([...['a', 'b']]);
    const obj = { a: 1, b: 2, c: 3 };
    const clone = { ...obj };
    console.log(obj, clone, 'are eqal:', obj === clone);
  }

  public createPolicy() {
    let newPolicy: { id: number, amount: number, clientId: number, userId: number, description: string } =
      { id: this.policies.length + 1, amount: 1, clientId: 1, userId: 1, description: 'New policy created: ' + new Date().toLocaleTimeString() }
    this.subscription.unsubscribe();
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
