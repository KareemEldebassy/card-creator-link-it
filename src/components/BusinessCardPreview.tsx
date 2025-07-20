import { BusinessCardData } from "./BusinessCardForm";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BusinessCardPreviewProps {
  data: BusinessCardData;
}

export function BusinessCardPreview({ data }: BusinessCardPreviewProps) {
  const hasContactInfo = data.email || data.phone || data.website;

  return (
    <Card className="w-full max-w-sm bg-gradient-card shadow-card-hover border-0 overflow-hidden transition-smooth">
      <div className="relative p-6">
        {/* Header with gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-primary"></div>
        
        {/* Main content */}
        <div className="pt-2 space-y-4">
          {/* Name and title section */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              {data.name || "Your Name"}
            </h2>
            <p className="text-lg text-primary font-medium">
              {data.title || "Your Title"}
            </p>
            <p className="text-base text-muted-foreground">
              {data.company || "Your Company"}
            </p>
          </div>

          {/* Contact information */}
          {hasContactInfo && (
            <div className="space-y-2 pt-2 border-t border-border">
              {data.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground truncate">{data.email}</span>
                </div>
              )}
              
              {data.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{data.phone}</span>
                </div>
              )}
              
              {data.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground truncate">{data.website}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}