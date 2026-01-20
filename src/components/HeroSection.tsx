import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import heroImage from "@/assets/hero-neural-heart.jpg";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8 inline-block">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
            Love Algorithm 💗
          </h1>
        </div>
        
        <p className="text-2xl md:text-3xl font-medium text-foreground mb-6">
          Every heart runs on its own algorithm.
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          You optimize projects, meetings, and deadlines — but what about emotions? 
          Take this 2-minute test to decode the logic of your heart.
        </p>
        
        <Button 
          onClick={onStartQuiz}
          size="lg"
          className="text-lg px-12 py-6 rounded-full shadow-glow hover:shadow-glow-secondary transition-all duration-300 hover:scale-105"
        >
          Run the Test
        </Button>

        <div className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
          Powered by asta 💗
        </div>
      </div>
    </section>
  );
};
