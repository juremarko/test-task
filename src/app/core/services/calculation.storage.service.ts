import { Injectable } from '@angular/core'
import { CalculationData } from '../helpers/calculation.data'
import { Observable, Subject } from 'rxjs';
import { CalculationDataFilter } from '../helpers/calculation.data.filter';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CalculationStoreService {
    private calculations: CalculationData[] = [];

    private notifyCalculationHistoryChange: Subject<any> = new Subject<any>();
    public notifyCalculationHistoryObservable: Observable<any> = this.notifyCalculationHistoryChange.asObservable();

    //Gets data from private storage
    getCalculations(calculationFilter?: CalculationDataFilter) {
        return this.calculations;
    }

    //Clears private storage and notifies whoever is listening
    clearCalculations(calculationFilter?: CalculationDataFilter) {
        this.calculations = [];
        this.notifyCalculationHistoryChange.next(null);
    }

    //Adds to private storage and notifies whoever is listening
    addCalculation(calculation: CalculationData): void {
        this.calculations.push(calculation);
        this.notifyCalculationHistoryChange.next(calculation);
    }
}






