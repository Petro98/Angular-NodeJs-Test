import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTenantComponentComponent } from './create-tenant-component.component';

describe('CreateTenantComponentComponent', () => {
  let component: CreateTenantComponentComponent;
  let fixture: ComponentFixture<CreateTenantComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTenantComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTenantComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
