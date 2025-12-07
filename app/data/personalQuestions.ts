export interface PersonalQuestion {
  id: number;
  question: string;
  answer: string[];
}

export type EditablePersonalQuestion = {
  id?: number;
  question: string;
  answer: string[];
};
