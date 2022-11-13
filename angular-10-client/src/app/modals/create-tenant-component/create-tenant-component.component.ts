import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-tenant-component',
  templateUrl: './create-tenant-component.component.html',
  styleUrls: ['./create-tenant-component.component.css']
})
export class CreateTenantComponentComponent implements OnInit {
  public form: FormGroup;
  submitted: boolean;

  constructor(private readonly dialogRef: MatDialogRef<CreateTenantComponentComponent>,
              private readonly fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private readonly data: any) {
    this.form = this.fb.group({
      name: this.fb.control(data && data.isEdit ? data.item.name : '' ,[Validators.required]),
      phone: this.fb.control(data && data.isEdit ? data.item.phone : '', [
        Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)
      ]),
      address: this.fb.control(data && data.isEdit ? data.item.address : '' ,[Validators.required]),
      financial_debt: this.fb.control(data && data.isEdit ? data.item.financial_debt : '' , [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }


  public get name() {
    return this.form.get('name') as FormControl;
  }

  public get phone() {
    return this.form.get('phone') as FormControl;
  }

  public get address() {
    return this.form.get('address') as FormControl;
  }

  public get financial_debt() {
    return this.form.get('financial_debt') as FormControl;
  }

  close(data: boolean): void {
    this.submitted = true;

    if (this.form.invalid && data) {
      return;
    }
    let dataItem;
    if (this.data.isEdit) {
      dataItem = {
        name: this.data.item.name !== this.name.value ? this.name.value : undefined,
        phone: this.data.item.phone !== this.phone.value ? this.phone.value : undefined,
        address: this.data.item.address !== this.address.value ? this.address.value : undefined,
        financial_debt: this.data.item.financial_debt !== this.financial_debt.value ? this.financial_debt.value : undefined,
      }
    } else {
      dataItem = this.form.value
    }
    this.dialogRef.close(data ? {dataItem, default: this.form.value} : data);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
