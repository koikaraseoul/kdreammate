import { Card } from "@/components/ui/card"
import { DreamButton } from "@/components/ui/dream-button"
import { Separator } from "@/components/ui/separator"
import html2canvas from "html2canvas"
import { toast } from "sonner"

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
  const saveDreamCard = async () => {
    const element = document.getElementById('dream-card');
    if (!element) {
      toast.error("Could not find dream card to save");
      return;
    }

    try {
      toast.loading("Creating your dream card...");
      
      // Wait for fonts and images to load
      await document.fonts.ready;
      
      // Store original styles
      const originalStyles = {
        height: element.style.height,
        maxHeight: element.style.maxHeight,
        overflow: element.style.overflow,
        position: element.style.position
      };
      
      // Temporarily expand the element to show all content
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      element.style.position = 'static';
      
      // Wait for layout to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Get the actual content dimensions
      const rect = element.getBoundingClientRect();
      const actualWidth = Math.max(element.scrollWidth, rect.width);
      const actualHeight = Math.max(element.scrollHeight, rect.height);
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#f9f7f4',
        width: actualWidth,
        height: actualHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        removeContainer: true,
        foreignObjectRendering: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('dream-card');
          if (clonedElement) {
            // Ensure the cloned element also shows all content
            clonedElement.style.height = 'auto';
            clonedElement.style.maxHeight = 'none';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.position = 'static';
            
            // Replace CSS custom properties with actual values
            clonedElement.style.background = 'linear-gradient(135deg, hsl(320 45% 85%) 0%, hsl(268 83% 95%) 100%)';
            clonedElement.style.boxShadow = '0 8px 25px -8px hsl(268 83% 58% / 0.15)';
            
            // Ensure all text is visible
            const textElements = clonedElement.querySelectorAll('*');
            textElements.forEach((el) => {
              const element = el as HTMLElement;
              const style = window.getComputedStyle(element);
              
              // Force text colors to be explicit
              if (style.color.includes('var(')) {
                element.style.color = '#4a4037';
              }
              
              // Convert background colors
              if (style.backgroundColor.includes('var(')) {
                element.style.backgroundColor = 'rgba(249, 247, 244, 0.3)';
              }
            });
            
            // Ensure proper rendering
            clonedElement.style.transform = 'translateZ(0)';
            clonedElement.style.willChange = 'auto';
          }
        }
      });

      // Restore original styles
      element.style.height = originalStyles.height;
      element.style.maxHeight = originalStyles.maxHeight;
      element.style.overflow = originalStyles.overflow;
      element.style.position = originalStyles.position;

      // Convert to JPG with high quality
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `dream-card-${new Date().toISOString().split('T')[0]}.jpg`;
      link.href = imgData;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Dream card saved successfully!");
    } catch (error) {
      console.error('Error saving dream card:', error);
      toast.error("Failed to save dream card. Please try again.");
    }
  };

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

        <Card id="dream-card" className="p-8 shadow-card bg-gradient-dreamy slide-up">
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

            <div className="grid gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">🌟 Dream</h3>
                <div className="bg-card/30 p-4 rounded-lg">
                  <div className="space-y-4">
                    {session.dream.map((response, index) => (
                      <p key={index} className="text-foreground/90 leading-relaxed">
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">⚡ Challenge</h3>
                <div className="bg-card/30 p-4 rounded-lg">
                  <div className="space-y-4">
                    {session.challenge.map((response, index) => (
                      <p key={index} className="text-foreground/90 leading-relaxed">
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">🌅 Turning Point</h3>
                <div className="bg-card/30 p-4 rounded-lg">
                  <div className="space-y-4">
                    {session.turningPoint.map((response, index) => (
                      <p key={index} className="text-foreground/90 leading-relaxed">
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">💡 Insight</h3>
                <div className="bg-card/30 p-4 rounded-lg">
                  <div className="space-y-4">
                    {session.insight.map((response, index) => (
                      <p key={index} className="text-foreground/90 leading-relaxed">
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">✨ Declaration</h3>
                <div className="bg-card/30 p-4 rounded-lg">
                  <div className="space-y-4">
                    {session.declaration.map((response, index) => (
                      <p key={index} className="text-foreground/90 leading-relaxed">
                        {response}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-foreground mb-3 text-lg">💌 Your Letter</h3>
              <div className="bg-card/50 p-6 rounded-lg">
                <div className="space-y-4">
                  {session.letter.map((response, index) => (
                    <p key={index} className="text-foreground/90 italic leading-relaxed">
                      {response}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-center gap-4 fade-in">
          <DreamButton 
            variant="gentle" 
            size="lg"
            onClick={saveDreamCard}
          >
            Save Dream Card
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