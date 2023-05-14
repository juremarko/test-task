import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CalculationData } from './core/helpers/calculation.data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculationStoreService } from './core/services/calculation.storage.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dhimahiTestTask';

  defaultMaxValue = 20;
  number1: number = 0;
  number2: number = 0;
  summedNumber: number = 0;

  //Subscription
  calculationHistorySubscriber: Subscription = new Subscription;

  //Data
  calculationHistory: CalculationData[] = [];

  //Table properties
  //@ViewChild(MatTable) calculationHistoryTable: MatTable<CalculationData> | undefined; //Not cool, what if there are multiple tables?
  @ViewChild('calculationHistoryTable', { static: true }) calculationHistoryTable: MatTable<CalculationData> | undefined;
  dataSource = new MatTableDataSource<CalculationData>(this.calculationHistory);
  columnsToDisplay = ['calculation', 'result', 'time'];

  //! COMPONENT FUNCTIONS

  constructor(
    public datepipe: DatePipe,
    private calculationStorage: CalculationStoreService) {
  }

  ngOnInit(): void {
    //1. Generate some random numbers on start
    this.generateRandomNumbers(this.defaultMaxValue);

    //2. Subscribe to new calculation event
    this.subscribeCalculationHistoryChange();
  }

  ngOnDestroy(): void {
    if (this.calculationHistorySubscriber) {
      this.calculationHistorySubscriber.unsubscribe();
    }
  }

  //! PUBLIC FUNCTIONS

  // Methods checks if the answer is correct and updates the calculation history
  onSubmit() {
    //Create calculation data model
    var calculationData: CalculationData =
    {
      calculation: String(this.number1) + " + " + String(this.number2) + " = " + String(this.summedNumber),
      isCorrect: false,
      date: this.datepipe.transform((new Date), 'dd.MM.yyyy HH:mm:ss') + ""
    }

    if (this.number1 + this.number2 == this.summedNumber) {
      calculationData.isCorrect = true;
    }
    else {
      calculationData.isCorrect = false;
    }

    //Adds model to storage
    this.calculationStorage.addCalculation(calculationData);
  }

  generateNewDigits() {
    this.generateRandomNumbers(this.defaultMaxValue);
  }

  getAllCalculationHistory() {
    this.calculationHistory = this.calculationStorage.getCalculations();
  }

  clearCalculationHistory() {
    this.calculationStorage.clearCalculations();
    this.calculationHistory = this.calculationStorage.getCalculations();
  }

  //! PRIVATE FUNCTIONS

  //Sets random digits for calculation
  private generateRandomNumbers(maxValue: number) {
    this.summedNumber = 0;

    //Set default value if number is not provided
    if (!maxValue) {
      maxValue = this.defaultMaxValue
    }

    this.number1 = Math.floor(Math.random() * maxValue);
    this.number2 = Math.floor(Math.random() * maxValue);
  }

  //Handles connection between this component and calculation storage service
  private subscribeCalculationHistoryChange() {
    this.calculationHistorySubscriber = this.calculationStorage.notifyCalculationHistoryObservable.subscribe((result: any) => {
      //Option 1: Add calculation data to calculation history (faster in this small app)
      //this.calculationHistory.push(result);

      //Option 2: We are notified calculation history has changed, so we can get it all (more correct IMO)
      this.calculationHistory = this.calculationStorage.getCalculations();

      //Refresh data source for table
      this.dataSource = new MatTableDataSource<CalculationData>(this.calculationHistory);
    });
  }

}
