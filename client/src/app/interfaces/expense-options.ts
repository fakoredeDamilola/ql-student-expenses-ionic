import { CurrencyPipe } from '@angular/common';

export interface ExpenseOptions {
    studentId?: string; //<-- The pet owner Id P.O
    reportId?:string; //<-- the property they reside Id Prop.
    reportsManagerId?:string; //<-- the property manager id of the place they reside at P.M
    expenseName: string;
    expenseCost: string;
}
