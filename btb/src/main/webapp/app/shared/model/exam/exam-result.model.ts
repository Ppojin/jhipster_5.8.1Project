import { Moment } from 'moment';

export interface IExamResult {
  id?: number;
  idExcerciseResult?: string;
  score?: number;
  gitUrl?: string;
  startDate?: Moment;
  endDate?: Moment;
  resultContentType?: string;
  result?: any;
}

export const defaultValue: Readonly<IExamResult> = {};
