import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { DreamButton } from "@/components/ui/dream-button"
import kdreammateCharacter from "@/assets/kdreammate-character.png"

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

  // Reset state when section changes
  useEffect(() => {
    setAnswers(section.prompts.map(() => ""))
    setCurrentPromptIndex(0)
    setShowTyping(true)
    setShowPrompt(false)
  }, [section.step])

  useEffect(() => {
    // Simulate typing delay
    const typingTimer = setTimeout(() => {
      setShowTyping(false)
      setShowPrompt(true)
    }, 1500)

    return () => clearTimeout(typingTimer)
  }, [currentPromptIndex, section.step])

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
        <Card className="p-6 bg-card shadow-soft animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg transition-all duration-300 ${showTyping ? 'animate-pulse scale-105' : 'hover-scale'}`}>
                <img 
                  src={kdreammateCharacter} 
                  alt="KDreammate" 
                  className="w-full h-full object-cover"
                />
              </div>
              {showTyping && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full animate-bounce"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <span>KDreammate</span>
                {showTyping && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full animate-pulse">
                    typing...
                  </span>
                )}
              </div>
              
              {showTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="typing-dots flex gap-1">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                </div>
              )}
              
              {showPrompt && (
                <div className="animate-fade-in">
                  <p className="text-foreground leading-relaxed text-lg">
                    {section.prompts[currentPromptIndex]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Journal Area */}
        {showPrompt && (
          <Card className="p-6 bg-card shadow-soft animate-fade-in journal-lines min-h-[200px] transition-all duration-300 hover:shadow-md">
            <Textarea
              placeholder="Write freely, like it's your own journal..."
              value={answers[currentPromptIndex]}
              onChange={(e) => handleAnswerChange(currentPromptIndex, e.target.value)}
              className="min-h-[150px] border-0 bg-transparent resize-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60 transition-all duration-200"
            />
          </Card>
        )}

        {/* Navigation */}
        {showPrompt && (
          <div className="flex justify-between items-center animate-fade-in">
            <DreamButton 
              variant="ghost" 
              onClick={onBack}
              disabled={isFirstSection}
              className={`transition-all duration-200 hover-scale ${isFirstSection ? "invisible" : ""}`}
            >
              ← Back
            </DreamButton>
            
            <div className="flex items-center gap-2">
              {section.prompts.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover-scale ${
                    index === currentPromptIndex 
                      ? "bg-primary shadow-lg scale-110" 
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
              className="transition-all duration-200 hover-scale"
            >
              {currentPromptIndex < section.prompts.length - 1 ? "Continue" : "Next Section"} →
            </DreamButton>
          </div>
        )}
      </div>
    </div>
  )
}