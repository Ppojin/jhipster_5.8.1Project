import { IExam } from 'app/shared/model/exam/exam.model';

export interface IExamStudent {
  id?: number;
  idCustomer?: string;
  exam?: IExam;
}

export const defaultValue: Readonly<IExamStudent> = {};
