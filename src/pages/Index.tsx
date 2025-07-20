import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessCardForm, BusinessCardData } from "@/components/BusinessCardForm";
import { BusinessCardPreview } from "@/components/BusinessCardPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Sparkles, Share2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cardData, setCardData] = useState<BusinessCardData>({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: ""
  });

  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  const generateBusinessCard = () => {
    // Validate that we have at least a name
    if (!cardData.name.trim()) {
      toast({
        title: "Please enter your name",
        description: "Name is required to generate a business card.",
        variant: "destructive",
      });
      return;
    }

    // Generate a unique ID for the card
    const cardId = Math.random().toString(36).substring(2, 15);
    
    // Store the card data in localStorage (in a real app, this would be saved to a database)
    localStorage.setItem(`card-${cardId}`, JSON.stringify(cardData));
    
    // Generate the shareable URL
    const url = `${window.location.origin}/card/${cardId}`;
    setGeneratedUrl(url);
    
    toast({
      title: "Business card generated!",
      description: "Your shareable link is ready.",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedUrl);
    toast({
      title: "Link copied!",
      description: "Shareable link copied to clipboard.",
    });
  };

  const openCard = () => {
    window.open(generatedUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground">
            Create Your Digital
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Business Card</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate professional digital business cards in seconds. Share your contact information with a simple link.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Beautiful Design</h3>
              <p className="text-sm text-muted-foreground">Professional templates that make you stand out</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Sharing</h3>
              <p className="text-sm text-muted-foreground">Share with a simple link that works everywhere</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Creation</h3>
              <p className="text-sm text-muted-foreground">Generate your card in seconds, no signup required</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="space-y-6">
            <BusinessCardForm
              data={cardData}
              onChange={setCardData}
              onGenerate={generateBusinessCard}
            />
            
            {generatedUrl && (
              <Card className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-primary" />
                    Your Shareable Link
                  </h3>
                  <div className="p-3 bg-muted rounded-lg break-all text-sm">
                    {generatedUrl}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                      Copy Link
                    </Button>
                    <Button onClick={openCard} className="flex-1 bg-gradient-primary">
                      View Card
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold mb-2">Live Preview</h2>
              <p className="text-muted-foreground">See how your business card will look</p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <BusinessCardPreview data={cardData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
