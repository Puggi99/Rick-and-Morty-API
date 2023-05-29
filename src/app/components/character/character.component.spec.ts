import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCharacter } from './character.component';

describe('CardComponent', () => {
  let component: ComponentCharacter;
  let fixture: ComponentFixture<ComponentCharacter>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentCharacter]
    });
    fixture = TestBed.createComponent(ComponentCharacter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
