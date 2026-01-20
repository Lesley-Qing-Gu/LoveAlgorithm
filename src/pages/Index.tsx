import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { QuizSection } from "@/components/QuizSection";
import { ResultSection } from "@/components/ResultSection";
import { algorithmTypes } from "@/data/algorithmTypes";

type AlgorithmType = keyof typeof algorithmTypes;

const Index = () => {
  const [view, setView] = useState<"hero" | "quiz" | "result">("hero");
  const [result, setResult] = useState<AlgorithmType | null>(null);

  const handleStartQuiz = () => {
    setView("quiz");
  };

  const handleQuizComplete = (answers: number[]) => {
    // Calculate result based on answers
    // Count which type (0, 1, 2, 3) appears most frequently
    const typeCounts = [0, 0, 0, 0];
    answers.forEach(answer => {
      typeCounts[answer]++;
    });
    
    const maxCount = Math.max(...typeCounts);
    const dominantType = typeCounts.indexOf(maxCount);
    
    // Map to algorithm types
    // Type 0 (analytical) -> DL-01, PM-02
    // Type 1 (intuitive) -> QA-07, SD-05
    // Type 2 (spontaneous) -> RG-06, OS-04
    // Type 3 (protective) -> FD-03, CO-08
    
    const typeMap: AlgorithmType[][] = [
      ["DL-01", "PM-02"],
      ["QA-07", "SD-05"],
      ["RG-06", "OS-04"],
      ["FD-03", "CO-08"]
    ];
    
    // Secondary characteristic based on second most common answer
    const sortedCounts = [...typeCounts].sort((a, b) => b - a);
    const secondaryIndex = typeCounts.indexOf(sortedCounts[1]);
    
    const resultType = secondaryIndex % 2 === 0 
      ? typeMap[dominantType][0] 
      : typeMap[dominantType][1];
    
    setResult(resultType);
    setView("result");
  };

  const handleReset = () => {
    setView("hero");
    setResult(null);
  };

  return (
    <main className="min-h-screen">
      {view === "hero" && <HeroSection onStartQuiz={handleStartQuiz} />}
      {view === "quiz" && <QuizSection onComplete={handleQuizComplete} />}
      {view === "result" && result && (
        <ResultSection resultType={result} onReset={handleReset} />
      )}
    </main>
  );
};

export default Index;
