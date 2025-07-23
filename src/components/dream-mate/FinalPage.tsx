import { Card } from "@/components/ui/card"
import { DreamButton } from "@/components/ui/dream-button"
import { Separator } from "@/components/ui/separator"
import html2canvas from "html2canvas"

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
  const downloadAsImage = async () => {
    const cardElement = document.getElementById('dream-card')
    if (!cardElement) return

    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#f8f9fa',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: cardElement.scrollWidth,
        height: cardElement.scrollHeight,
        scrollX: 0,
        scrollY: 0
      })
      
      const link = document.createElement('a')
      link.download = `kdreammate-card-${new Date().toISOString().split('T')[0]}.jpg`
      link.href = canvas.toDataURL('image/jpeg', 1.0)
      link.click()
    } catch (error) {
      console.error('Failed to generate image:', error)
    }
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

        <Card id="dream-card" className="p-8 shadow-card bg-white border-2 border-gray-200 slide-up" style={{ backgroundColor: 'white', color: '#1a1a1a' }}>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Dream Journey
              </h2>
              <p className="text-sm" style={{ color: '#4a4a4a' }}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <Separator />

            <div className="grid gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#1a1a1a' }}>🌟 Dream</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-4">
                    {session.dream.map((response, index) => (
                      <p key={index} className="leading-relaxed" style={{ color: '#2d2d2d' }}>
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#1a1a1a' }}>⚡ Challenge</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-4">
                    {session.challenge.map((response, index) => (
                      <p key={index} className="leading-relaxed" style={{ color: '#2d2d2d' }}>
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#1a1a1a' }}>🌅 Turning Point</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-4">
                    {session.turningPoint.map((response, index) => (
                      <p key={index} className="leading-relaxed" style={{ color: '#2d2d2d' }}>
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#1a1a1a' }}>💡 Insight</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-4">
                    {session.insight.map((response, index) => (
                      <p key={index} className="leading-relaxed" style={{ color: '#2d2d2d' }}>
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#1a1a1a' }}>✨ Declaration</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-4">
                    {session.declaration.map((response, index) => (
                      <p key={index} className="leading-relaxed" style={{ color: '#2d2d2d' }}>
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3 text-lg" style={{ color: '#1a1a1a' }}>💌 Your Letter</h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="space-y-4">
                  {session.letter.map((response, index) => (
                    <p key={index} className="italic leading-relaxed" style={{ color: '#1a4b8c' }}>
                      {response}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4 justify-center fade-in">
          <DreamButton 
            variant="journal" 
            size="lg"
            onClick={downloadAsImage}
          >
            Save as Image
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
            Thank you for taking this journey with KDreammate ✨
          </p>
        </div>
      </div>
    </div>
  )
}