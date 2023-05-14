import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  var component: AppComponent;
  var fixture: ComponentFixture<AppComponent>;
  var randomGenerationMethodsDefaultCycles = 100;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      MatInputModule,
      MatButtonModule,
      MatTableModule
    ],
    providers: [DatePipe]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  //! Checks that component creates

  it('APP - should create the application', () => {
    expect(component).toBeTruthy();
  });
  it('APP - should render title', () => {
    expect(component.title).toEqual('dhimahiTestTask');
  });
  it(`APP - should have title 'dhimahiTestTask'`, () => {
    expect(component.title).toEqual('dhimahiTestTask');
  });

  it('APP - should have first digit defined', () => {
    expect(component.number1).toBeDefined();
  });
  it('APP - should have first digit greater or equal 0', () => {
    expect(component.number1).toBeGreaterThanOrEqual(0);
  });
  it('APP - should have first digit lower or equal max value', () => {
    expect(component.number1).toBeLessThanOrEqual(component.defaultMaxValue);
  });

  it('APP - should have second digit defined', () => {
    expect(component.number2).toBeDefined();
  });
  it('APP - should have second digit greater or equal 0', () => {
    expect(component.number2).toBeGreaterThanOrEqual(0);
  });
  it('APP - should have second digit lower or equal max value', () => {
    expect(component.number2).toBeLessThanOrEqual(component.defaultMaxValue);
  });

  //! Methods
  //? How to test method that generates random values? Currently just call it 100 times and check every time.

  it('generateNewDigits - should have first digit defined ' + String(randomGenerationMethodsDefaultCycles) + ' times', () => {
    for (var i = 0; i < randomGenerationMethodsDefaultCycles; i++) {
      component.generateNewDigits();
      expect(component.number1).toBeDefined();
    }
  });
  it('generateNewDigits - should have first digit greater or equal 0 ' + String(randomGenerationMethodsDefaultCycles) + ' times', () => {
    for (var i = 0; i < randomGenerationMethodsDefaultCycles; i++) {
      component.generateNewDigits();
      expect(component.number1).toBeGreaterThanOrEqual(0);
    }
  });
  it('generateNewDigits - should have first digit lower or equal max value ' + String(randomGenerationMethodsDefaultCycles) + ' times', () => {
    for (var i = 0; i < randomGenerationMethodsDefaultCycles; i++) {
      component.generateNewDigits();
      expect(component.number1).toBeLessThanOrEqual(component.defaultMaxValue);
    }
  });

  it('generateNewDigits - should have second digit defined ' + String(randomGenerationMethodsDefaultCycles) + ' times', () => {
    for (var i = 0; i < randomGenerationMethodsDefaultCycles; i++) {
      component.generateNewDigits();
      expect(component.number2).toBeDefined();
    }
  });
  it('generateNewDigits - should have second digit greater or equal 0 ' + String(randomGenerationMethodsDefaultCycles) + ' times', () => {
    for (var i = 0; i < randomGenerationMethodsDefaultCycles; i++) {
      component.generateNewDigits();
      expect(component.number2).toBeGreaterThanOrEqual(0);
    }
  });
  it('generateNewDigits - should have second digit lower or equal max value ' + String(randomGenerationMethodsDefaultCycles) + ' times', () => {
    for (var i = 0; i < randomGenerationMethodsDefaultCycles; i++) {
      component.generateNewDigits();
      expect(component.number2).toBeLessThanOrEqual(component.defaultMaxValue);
    }
  });

  it('getAllCalculationHistory - history should have at least one record', () => {
    component.number1 = 1;
    component.number2 = 2;
    component.summedNumber = 3
    
    component.onSubmit();
    component.getAllCalculationHistory();

    expect(component.calculationHistory.length).toBeGreaterThanOrEqual(1);
  });
  it('clearCalculationHistory - history should have no records', () => {
    component.number1 = 1;
    component.number2 = 2;
    component.summedNumber = 3
    
    component.onSubmit();
    component.getAllCalculationHistory();
    expect(component.calculationHistory.length).toBeGreaterThanOrEqual(1);

    component.clearCalculationHistory();
    expect(component.calculationHistory.length).toEqual(0);
  });

  it('onSubmit - calculation should have been correct', () => {
    component.number1 = 1;
    component.number2 = 2;
    component.summedNumber = 3
    
    component.onSubmit();
    component.getAllCalculationHistory();

    expect(component.calculationHistory[component.calculationHistory.length - 1].isCorrect).toBeTrue();
  });
  it('onSubmit - calculation should have been wrong', () => {
    component.number1 = 1;
    component.number2 = 2;
    component.summedNumber = 4
    
    component.onSubmit();
    component.getAllCalculationHistory();

    expect(component.calculationHistory[component.calculationHistory.length - 1].isCorrect).toBeFalse();
  });
});
