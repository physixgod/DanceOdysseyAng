// trivia.component.ts
import { Component, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';
import { question } from 'src/app/models/question';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {
  questions: question[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: string[] = [];
  score: number = 0;
  timer: number = 0;
  timerInterval: any;
  isLastQuestion: boolean = false;
  quizSubmitted: boolean = false; // Flag to track whether the quiz has been submitted

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {
    this.triviaService.getTenRandomQuestions().subscribe(
      (questions: question[]) => {
        this.questions = questions;
        this.loadQuestion();
        this.startTimer();
      },
      (error) => {
        console.error('Error fetching questions', error);
      }
    );
  }

  loadQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.userAnswers.push(''); // Initialize user answer for the current question

      // Log details for debugging purposes
      console.log(`Question ${this.currentQuestionIndex + 1}: ${currentQuestion.questionText}`);
      console.log(`Options: ${currentQuestion.wronganswer1}, ${currentQuestion.wronganswer2}, ${currentQuestion.correctAnswer}`);
    } else {
      console.error('Attempted to load a question beyond the array length.');
    }
  }

  nextQuestion(): void {
    clearInterval(this.timerInterval);
    this.submitAnswer();
    this.currentQuestionIndex++;

    // Check if it's the last question
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.isLastQuestion = true;
    }

    this.loadQuestion();
    this.startTimer();
  }

  submitQuiz(): void {
    clearInterval(this.timerInterval);
    this.submitAnswer();
    this.quizSubmitted = true; // Set the flag to indicate quiz submission
    console.log(`Quiz completed! Your score: ${this.score}/${this.questions.length}`);
    // Redirect or handle the completion logic here
  }

  submitAnswer(): void {
    const userAnswer = this.userAnswers[this.currentQuestionIndex]?.toLowerCase();
    const correctAnswer = this.questions[this.currentQuestionIndex]?.correctAnswer?.toLowerCase();

    if (userAnswer && correctAnswer) {
      if (userAnswer === correctAnswer) {
        this.score++;
      }
    } else {
      console.error('Attempted to access undefined properties for user answer or correct answer.');
    }
  }

  startTimer(): void {
    let timeLeft = 10; // set the time limit in seconds
    this.timer = timeLeft;
    this.timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        this.timer = timeLeft;
      } else {
        clearInterval(this.timerInterval);
        if (!this.isLastQuestion) {
          this.nextQuestion();
        }
      }
    }, 1000);
  }
}
