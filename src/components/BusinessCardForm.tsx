import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, Mail, Phone, Globe, Briefcase } from "lucide-react";

export interface BusinessCardData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
}

interface BusinessCardFormProps {
  data: BusinessCardData;
  onChange: (data: BusinessCardData) => void;
  onGenerate: () => void;
}

export function BusinessCardForm({ data, onChange, onGenerate }: BusinessCardFormProps) {
  const handleInputChange = (field: keyof BusinessCardData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const isFormValid = data.name && data.title && data.company && data.email;

  return (
    <Card className="w-full max-w-md bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Your Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={data.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="transition-smooth"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="title"
              placeholder="Software Engineer"
              value={data.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="pl-10 transition-smooth"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="company"
              placeholder="Tech Corp"
              value={data.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="pl-10 transition-smooth"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10 transition-smooth"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="pl-10 transition-smooth"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="website"
              placeholder="www.example.com"
              value={data.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="pl-10 transition-smooth"
            />
          </div>
        </div>

        <Button 
          onClick={onGenerate} 
          disabled={!isFormValid}
          className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
        >
          Generate Business Card
        </Button>
      </CardContent>
    </Card>
  );
}