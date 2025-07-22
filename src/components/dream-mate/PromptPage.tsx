import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { DreamButton } from "@/components/ui/dream-button"

interface PromptPageProps {
  section: {
    title: string
    subtitle: string
    step: number
    prompts: string[]
  }
  onNext: (answers: string[]) => void
  onBack: () => void
  isFirstSection?: boolean
}

export function PromptPage({ section, onNext, onBack, isFirstSection }: PromptPageProps) {
  const [answers, setAnswers] = useState<string[]>(section.prompts.map(() => ""))
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [showTyping, setShowTyping] = useState(true)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Simulate typing delay
    const typingTimer = setTimeout(() => {
      setShowTyping(false)
      setShowPrompt(true)
    }, 1500)

    return () => clearTimeout(typingTimer)
  }, [currentPromptIndex])

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentPromptIndex < section.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1)
      setShowTyping(true)
      setShowPrompt(false)
    } else {
      onNext(answers)
    }
  }

  const canContinue = answers[currentPromptIndex]?.trim().length > 0

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center text-sm text-muted-foreground fade-in">
          <span>Step {section.step} · {section.title}</span>
          <span>{section.subtitle}</span>
        </div>

        {/* Chat Bubble */}
        <Card className="p-6 bg-card shadow-soft slide-up">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-dreamy flex items-center justify-center text-sm">
              ✨
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-2">Dream Mate</div>
              
              {showTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">Dream Mate is typing</span>
                  <div className="typing-dots">
                    <span></span>
                  </div>
                </div>
              )}
              
              {showPrompt && (
                <div className="fade-in">
                  <p className="text-foreground leading-relaxed">
                    {section.prompts[currentPromptIndex]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Journal Area */}
        {showPrompt && (
          <Card className="p-6 bg-card shadow-soft slide-up journal-lines min-h-[200px]">
            <Textarea
              placeholder="Write freely, like it's your own journal..."
              value={answers[currentPromptIndex]}
              onChange={(e) => handleAnswerChange(currentPromptIndex, e.target.value)}
              className="min-h-[150px] border-0 bg-transparent resize-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60"
            />
          </Card>
        )}

        {/* Navigation */}
        {showPrompt && (
          <div className="flex justify-between items-center fade-in">
            <DreamButton 
              variant="ghost" 
              onClick={onBack}
              disabled={isFirstSection}
              className={isFirstSection ? "invisible" : ""}
            >
              ← Back
            </DreamButton>
            
            <div className="flex items-center gap-2">
              {section.prompts.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentPromptIndex 
                      ? "bg-primary" 
                      : index < currentPromptIndex 
                      ? "bg-primary/60" 
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
            
            <DreamButton 
              variant="dreamy" 
              onClick={handleNext}
              disabled={!canContinue}
            >
              {currentPromptIndex < section.prompts.length - 1 ? "Continue" : "Next Section"} →
            </DreamButton>
          </div>
        )}
      </div>
    </div>
  )
}