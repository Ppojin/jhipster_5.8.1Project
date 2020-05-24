import { Moment } from 'moment';
import { IExamStudent } from 'app/shared/model/exam/exam-student.model';
import { IExamQABank } from 'app/shared/model/exam/exam-qa-bank.model';

export const enum Level {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE'
}

export interface IExam {
  id?: number;
  idExam?: string;
  title?: string;
  level?: Level;
  startDate?: Moment;
  endDate?: Moment;
  examStudents?: IExamStudent[];
  examQABanks?: IExamQABank[];
}

export const defaultValue: Readonly<IExam> = {};
