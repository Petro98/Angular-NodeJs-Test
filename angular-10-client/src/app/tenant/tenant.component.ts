import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {TenantService} from "../_services/tenant.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateTenantComponentComponent} from "../modals/create-tenant-component/create-tenant-component.component";
import {debounceTime, switchMap, takeUntil, tap} from "rxjs/operators";
import {of, Subject} from "rxjs";

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit, OnDestroy {

  tenants: any = []
  form: FormGroup;
  private readonly ngOnDestroySubj = new Subject<void>();

  private searchSubject$: Subject<string> = new Subject<string>();
  private sort: boolean;

  constructor(private fb: FormBuilder,
              private tenantService: TenantService,
              private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.tenantService.getTenants().subscribe(res => {
      this.tenants = res
      this.initForm()
    })

    this.searchSubject$
      .pipe(
        debounceTime(300),
        switchMap((search) => this.tenantService.search(search)))
      .subscribe(res => {
        this.tenants = res
        this.initForm()
      })
  }

  get getTenantControls(): FormArray {
    return <FormArray>this.form.get('tenant');
  }

  get getFilterTenantControls(): AbstractControl[] {
    return this.getTenantControls.controls
      .sort((a, b) =>
        this.sort ? b.get('phone').value - a.get('phone').value : a.get('phone').value - b.get('phone').value
      )
  }

  private initForm(): void {
    this.form = this.fb.group({
      tenant: this.fb.array([]),
    });
    this.test()
  }

  test(): void {
    this.tenants.forEach(res => {
      this.getTenantControls.push(this.fb.group(res))
    })
  }

  delete(idx, item): void {
    this.tenantService.delete(item.value._id).pipe(
      takeUntil(this.ngOnDestroySubj),
      tap(res => res && res.deletedCount ? this.getTenantControls.removeAt(idx) : null)
    ).subscribe()
  }

  edit(index: number, item): void {
    let result;
    this.dialog.open(CreateTenantComponentComponent, {
      width: '600px',
      height: '450px',
      data: {isEdit: true, item: item.value},
    }).afterClosed().pipe(
      takeUntil(this.ngOnDestroySubj),
      switchMap((data: any) => {
        result = data.default
        return data ? this.tenantService.update(data.dataItem, item.value._id) : of(null)
      }),
      tap(res => res ? this.getTenantControls.at(index).patchValue({...result}) : null)
    ).subscribe()
  }

  create() {
    this.dialog.open(CreateTenantComponentComponent, {
      width: '600px',
      height: '450px',
      data: {isEdit: false,},
    }).afterClosed().pipe(
      takeUntil(this.ngOnDestroySubj),
      switchMap((data: any) => data ? this.tenantService.create(data.dataItem) : of(null)),
      tap(res => {
        res ? this.getTenantControls.push(this.fb.group(res)) : null
      })
    ).subscribe()
  }


  search(search: string) {
    this.searchSubject$.next(search)
  }

  public ngOnDestroy(): void {
    this.ngOnDestroySubj.next();
    this.ngOnDestroySubj.complete();
  }

  public sortPhone(): void {
    this.sort = !this.sort
  }
}
