import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { algorithmTypes } from "@/data/algorithmTypes";
import { Share2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultSectionProps {
  resultType: keyof typeof algorithmTypes;
  onReset: () => void;
}

export const ResultSection = ({ resultType, onReset }: ResultSectionProps) => {
  const { toast } = useToast();
  const result = algorithmTypes[resultType];

  const handleShare = () => {
    const text = `I just discovered my asta type: ${result.name} ${result.emoji}\n\nFind your compatible code at asta.app 💞`;
    
    if (navigator.share) {
      navigator.share({
        title: "My asta Type",
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Share your result with friends",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-accent/20 to-background">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div 
              className="text-8xl mb-4 animate-float"
              style={{ 
                filter: "drop-shadow(0 0 20px rgba(255, 105, 135, 0.5))",
              }}
            >
              {result.emoji}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Heart Type
          </h2>
          
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-accent mb-4">
            <p className="text-xl font-semibold text-white">
              {result.code} — {result.name}
            </p>
          </div>
        </div>

        <Card className="p-8 md:p-12 bg-gradient-card shadow-2xl mb-8">
          <div className="space-y-8">
            <div>
              <p className="text-lg leading-relaxed text-foreground mb-6">
                {result.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                  ✨ Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="text-foreground flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                  💫 Growth Areas
                </h3>
                <ul className="space-y-2">
                  {result.challenges.map((challenge, index) => (
                    <li key={index} className="text-foreground flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                💞 Best Match
              </h3>
              <p className="text-foreground">{result.bestMatch}</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleShare}
            size="lg"
            className="px-8 py-6 text-lg rounded-full shadow-glow hover:shadow-glow-secondary transition-all duration-300 hover:scale-105"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Your Algorithm
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Take Again
          </Button>
        </div>

        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm italic">Because even logic needs a little love. ✨</p>
          <p className="text-xs mt-2 opacity-70">Powered by asta 💗</p>
        </div>
      </div>
    </section>
  );
};
