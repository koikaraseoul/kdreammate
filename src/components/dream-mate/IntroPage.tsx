import { DreamButton } from "@/components/ui/dream-button"
import { Card } from "@/components/ui/card"

interface IntroPageProps {
  onStart: () => void
}

export function IntroPage({ onStart }: IntroPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-card border-0 bg-gradient-dreamy fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ✨ KDreammate
          </h1>
          <p className="text-lg font-medium text-foreground/80">
            A Conversation to Discover Your Dream
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A quiet space to meet yourself — one heartful prompt at a time.
          </p>
        </div>
        
        <div className="space-y-4 pt-4">
          <DreamButton 
            variant="journal" 
            size="lg" 
            onClick={onStart}
            className="w-full"
          >
            Begin My Journey
          </DreamButton>
          
          <p className="text-sm text-muted-foreground">
            Take your time. This is your space.
          </p>
        </div>
      </Card>
    </div>
  )
}