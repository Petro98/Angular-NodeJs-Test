import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';


const TENANT_API = 'http://localhost:8080/api/v1/tenant/';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  authTenant: boolean = false

  constructor(private http: HttpClient) {
  }

  getTenants(): Observable<any> {
    return this.http.get(TENANT_API + 'all')
  }

  delete(_id): Observable<any> {
    return this.http.delete(TENANT_API + _id);
  }

  update(data,_id): Observable<any> {
    return this.http.put(TENANT_API + _id, {
      ...data
    });
  }
  create(data): Observable<any> {
    return this.http.post(TENANT_API, {
      ...data
    });
  }

  search(search: string) {
    return this.http.post(TENANT_API + 'search',{search} );
  }
}
