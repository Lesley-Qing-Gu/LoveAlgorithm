import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/data/quizData";

interface QuizSectionProps {
  onComplete: (answers: number[]) => void;
}

export const QuizSection = ({ onComplete }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="w-full max-w-3xl">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span className="flex items-center gap-2">
              Powered by asta 💗
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 md:p-12 bg-gradient-card shadow-xl animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-foreground">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant="outline"
                className="w-full text-left h-auto py-6 px-6 text-lg justify-start hover:bg-accent hover:border-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-md rounded-xl"
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
