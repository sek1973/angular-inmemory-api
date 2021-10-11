import { Component } from '@angular/core';
import { PolicyService } from './policy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  policies: any[] = [];
  constructor(private policyService: PolicyService) { }

  ngOnInit() {
    this.policyService.getPolicies().subscribe((data: any[]) => {
      console.log(data);
      this.policies = data;
    })
  }

  public deletePolicy(policyId: any) {
    this.policyService.deletePolicy(policyId).subscribe((ret) => {
      console.log("Policy deleted: ", ret);
    })
  }


  public updatePolicy(policy: { id: number, amount: number, clientId: number, userId: number, description: string }) {
    let newPolicy: { id: number, amount: number, clientId: number, userId: number, description: string } = { id: policy.id, amount: 0, clientId: 0, userId: 0, description: '' };
    this.policyService.updatePolicy(policy).subscribe((ret) => {
      console.log("Policy updated: ", ret);
    });
  }

  public createPolicy(policy: any) {
    this.policyService.createPolicy(policy).subscribe((ret) => {
      console.log("Policy created: ", ret);
    });
  }
}
