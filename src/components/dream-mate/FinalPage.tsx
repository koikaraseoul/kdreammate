import { Card } from "@/components/ui/card"
import { DreamButton } from "@/components/ui/dream-button"
import { Separator } from "@/components/ui/separator"

interface DreamSession {
  dream: string[]
  challenge: string[]
  turningPoint: string[]
  insight: string[]
  declaration: string[]
  letter: string[]
}

interface FinalPageProps {
  session: DreamSession
  onRestart: () => void
}

export function FinalPage({ session, onRestart }: FinalPageProps) {
  const downloadPDF = () => {
    // Simple implementation - in real app, you'd use a PDF library
    const content = `
DREAM MATE JOURNAL

DREAM:
${session.dream.join('\n\n')}

CHALLENGE:
${session.challenge.join('\n\n')}

TURNING POINT:
${session.turningPoint.join('\n\n')}

INSIGHT:
${session.insight.join('\n\n')}

DECLARATION & ACTION:
${session.declaration.join('\n\n')}

LETTER:
${session.letter.join('\n\n')}

Created with Dream Mate
    `.trim()
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dream-mate-journal-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            ✨ Your Dream ID Card
          </h1>
          <p className="text-muted-foreground">
            A beautiful summary of your journey today
          </p>
        </div>

        <Card className="p-8 shadow-card bg-gradient-dreamy slide-up">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Dream Journey
              </h2>
              <p className="text-sm text-foreground/70">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <Separator />

            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">🌟 Dream</h3>
                <p className="text-sm text-foreground/80 line-clamp-3">
                  {session.dream.join(' ').slice(0, 120)}...
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">⚡ Challenge</h3>
                <p className="text-sm text-foreground/80 line-clamp-2">
                  {session.challenge.join(' ').slice(0, 100)}...
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">🌅 Turning Point</h3>
                <p className="text-sm text-foreground/80 line-clamp-2">
                  {session.turningPoint.join(' ').slice(0, 100)}...
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">💡 Insight</h3>
                <p className="text-sm text-foreground/80 line-clamp-2">
                  {session.insight.join(' ').slice(0, 100)}...
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">✨ Declaration</h3>
                <p className="text-sm text-foreground/80 line-clamp-2">
                  {session.declaration.join(' ').slice(0, 100)}...
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-foreground mb-2">💌 Your Letter</h3>
              <div className="bg-card/50 p-4 rounded-lg">
                <p className="text-sm text-foreground/80 italic line-clamp-4">
                  {session.letter.join(' ').slice(0, 200)}...
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4 justify-center fade-in">
          <DreamButton 
            variant="journal" 
            size="lg"
            onClick={downloadPDF}
          >
            Download PDF
          </DreamButton>
          
          <DreamButton 
            variant="gentle" 
            size="lg"
            onClick={onRestart}
          >
            Start Again
          </DreamButton>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for taking this journey with Dream Mate ✨
          </p>
        </div>
      </div>
    </div>
  )
}