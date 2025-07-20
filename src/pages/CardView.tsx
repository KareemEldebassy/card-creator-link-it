import { useParams } from "react-router-dom";
import { BusinessCardPreview } from "@/components/BusinessCardPreview";
import { BusinessCardData } from "@/components/BusinessCardForm";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CardView() {
  const { id } = useParams();
  const { toast } = useToast();

  // In a real app, you'd fetch this data from an API
  // For now, we'll try to get it from localStorage or use demo data
  const getCardData = (): BusinessCardData => {
    try {
      const stored = localStorage.getItem(`card-${id}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading card data:", error);
    }
    
    // Demo data if no stored data found
    return {
      name: "John Doe",
      title: "Software Engineer",
      company: "Tech Corp",
      email: "john@techcorp.com",
      phone: "+1 (555) 123-4567",
      website: "www.johndoe.dev"
    };
  };

  const cardData = getCardData();

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.name} - Business Card`,
          text: `Check out ${cardData.name}'s digital business card`,
          url: url,
        });
        toast({
          title: "Shared successfully!",
          description: "Business card has been shared.",
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Business card link copied to clipboard.",
        });
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Business card link copied to clipboard.",
      });
    }
  };

  const handleDownload = () => {
    // This would implement downloading the card as an image
    toast({
      title: "Download feature coming soon!",
      description: "Image download will be available in the next update.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              {cardData.name}'s Business Card
            </h1>
            <p className="text-lg text-muted-foreground">
              Digital business card created with CardCreator
            </p>
          </div>

          <div className="flex justify-center">
            <BusinessCardPreview data={cardData} />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Card
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="text-center">
            <Button asChild variant="default" className="bg-gradient-primary">
              <a href="/">Create Your Own Card</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}