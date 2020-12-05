export class Expense {
    id: string;
    studentId: string; //<-- The pet owner Id P.O
    reportId?:string; //<-- the property they reside Id Prop.
    reportsManagerId?:string; //<-- the property manager id of the place they reside at P.M
    created?: string;
    expenseName: string;
    expenseCost: string;
}
