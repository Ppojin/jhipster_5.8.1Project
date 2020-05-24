import { IExam } from 'app/shared/model/exam/exam.model';

export interface IExamQABank {
  id?: number;
  idQABank?: string;
  exams?: IExam[];
}

export const defaultValue: Readonly<IExamQABank> = {};
