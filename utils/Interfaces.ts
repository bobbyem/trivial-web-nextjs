export enum Category {
  html = 0,
  javascript,
  css,
  framework,
  backend,
  history,
}

export interface Question {
  id: string;
  category: Category;
  question: string;
  alternatives?: string | null;
  answer: string;
}

export interface QuestionsState {
  questions: Question[];
  completed: Question[];
}
