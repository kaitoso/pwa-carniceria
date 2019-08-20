import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosClienteComponent } from './lista-productos-cliente.component';

describe('ListaProductosClienteComponent', () => {
  let component: ListaProductosClienteComponent;
  let fixture: ComponentFixture<ListaProductosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProductosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProductosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
