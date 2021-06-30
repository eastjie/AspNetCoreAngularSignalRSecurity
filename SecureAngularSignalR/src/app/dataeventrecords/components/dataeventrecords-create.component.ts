import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OidcSecurityService, ConfigAuthenticatedResult } from 'angular-auth-oidc-client';

import { DataEventRecordsService } from '../dataeventrecords.service';
import { DataEventRecord } from '../models/DataEventRecord';

@Component({
  selector: 'app-dataeventrecords-create',
  templateUrl: 'dataeventrecords-create.component.html',
})
export class DataEventRecordsCreateComponent implements OnInit {
  message: string;
  dataEventRecord: DataEventRecord = {
    id: 0,
    name: '',
    description: '',
    timestamp: '',
  };

  isAuthenticated$: Observable<boolean | ConfigAuthenticatedResult[]>;

  constructor(
    private dataEventRecordsService: DataEventRecordsService,
    public oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {
    this.message = 'DataEventRecords Create';
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
  }

  ngOnInit() {
    this.isAuthenticated$.pipe(
      map((isAuthorized: boolean) => {
        console.log('isAuthorized: ' + isAuthorized);
      })
    );

    this.dataEventRecord = { id: 0, name: '', description: '', timestamp: '' };
  }

  Create() {
    // router navigate to DataEventRecordsList
    this.dataEventRecordsService.Add(this.dataEventRecord).subscribe(
      (data: any) => (this.dataEventRecord = data),
      () => this.router.navigate(['/dataeventrecords'])
    );
  }
}
