import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getPolicies(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.SERVER_URL + 'policies');
  }

  public getPolicy(policyId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.SERVER_URL + 'policies'}/${policyId}`);
  }
  public createPolicy(policy: { id: number, amount: number, clientId: number, userId: number, description: string }) {
    return this.httpClient.post(`${this.SERVER_URL + 'policies'}`, policy)
  }

  public deletePolicy(policyId: any) {
    return this.httpClient.delete(`${this.SERVER_URL + 'policies'}/${policyId}`)
  }
  public updatePolicy(policy: { id: number, amount: number, clientId: number, userId: number, description: string }) {
    return this.httpClient.put(`${this.SERVER_URL + 'policies'}/${policy.id}`, policy)
  }

}
