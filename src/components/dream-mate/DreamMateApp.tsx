import { useState } from "react"
import { IntroPage } from "./IntroPage"
import { PromptPage } from "./PromptPage"
import { FinalPage } from "./FinalPage"

const SECTIONS = [
  {
    title: "DREAM",
    subtitle: "Set your intention",
    step: 1,
    prompts: [
      "Hi there. I'm your KDreammate for today. How does this space feel to you?",
      "What feeling brought you here today?",
      "What quiet wish is waiting inside you?"
    ]
  },
  {
    title: "CHALLENGE", 
    subtitle: "Acknowledge the difficulty",
    step: 2,
    prompts: [
      "What's been difficult while protecting your dream?",
      "What emotion has shaken you the most?"
    ]
  },
  {
    title: "TURNING POINT",
    subtitle: "Find your resilience", 
    step: 3,
    prompts: [
      "Was there a moment you nearly gave up?",
      "What helped you rise again?"
    ]
  },
  {
    title: "INSIGHT",
    subtitle: "Discover your wisdom",
    step: 4, 
    prompts: [
      "What word describes your heart right now?",
      "What lesson might your story be whispering to you?"
    ]
  },
  {
    title: "DECLARATION & ACTION",
    subtitle: "Make gentle promises",
    step: 5,
    prompts: [
      "What small promise can you make to yourself today?",
      "Let's list 3 actions — gentle, doable, yours."
    ]
  },
  {
    title: "LETTER",
    subtitle: "Write from your heart",
    step: 6,
    prompts: [
      "Write a short letter — to your future self, to someone you care about, or to today's you."
    ]
  }
]

interface DreamSession {
  dream: string[]
  challenge: string[]
  turningPoint: string[]
  insight: string[]
  declaration: string[]
  letter: string[]
}

export function DreamMateApp() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = intro, 1-6 = sections, 7 = final
  const [session, setSession] = useState<DreamSession>({
    dream: [],
    challenge: [],
    turningPoint: [],
    insight: [],
    declaration: [],
    letter: []
  })

  const handleStart = () => {
    setCurrentStep(1)
  }

  const handleNext = (answers: string[]) => {
    const sectionKeys = ['dream', 'challenge', 'turningPoint', 'insight', 'declaration', 'letter'] as const
    const currentSectionKey = sectionKeys[currentStep - 1]
    
    setSession(prev => ({
      ...prev,
      [currentSectionKey]: answers
    }))

    if (currentStep < SECTIONS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(7) // Final page
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setSession({
      dream: [],
      challenge: [],
      turningPoint: [],
      insight: [],
      declaration: [],
      letter: []
    })
  }

  // Intro page
  if (currentStep === 0) {
    return <IntroPage onStart={handleStart} />
  }

  // Final page
  if (currentStep === 7) {
    return <FinalPage session={session} onRestart={handleRestart} />
  }

  // Prompt pages
  const section = SECTIONS[currentStep - 1]
  
  return (
    <PromptPage
      section={section}
      onNext={handleNext}
      onBack={handleBack}
      isFirstSection={currentStep === 1}
    />
  )
}