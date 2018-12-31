export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  questions_pool: string[];
  correctAnswer_index: number;
  isAnswered: boolean;
  clickedButtonIndex: number;
  buttonClass: string[];
}
