export interface PersonalQuestion {
  id: number;
  question: string;
  answer: string[];
  is_default: boolean;
}

export type EditablePersonalQuestion = {
  id?: number;
  question: string;
  answer: string[];
  is_default?: boolean;
};
