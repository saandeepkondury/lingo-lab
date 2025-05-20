
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SubmitFormProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    name: string;
    email: string;
    company: string;
    lingo: string;
    url: string;
    story: string;
    role: string;
    availability: string;
    interviewWillingness: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SubmitForm = ({ 
  isSubmitting, 
  onSubmit, 
  formData, 
  handleChange, 
  handleCheckboxChange 
}: SubmitFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Jane Smith"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            placeholder="Acme Inc."
            required
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Your Role</Label>
          <Input
            id="role"
            name="role"
            placeholder="Founder, CMO, Head of Marketing, etc."
            required
            value={formData.role}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lingo">Key Phrase or Lingo</Label>
        <Input
          id="lingo"
          name="lingo"
          placeholder="The phrase that made a difference (e.g., 'Financial Infrastructure')"
          required
          value={formData.lingo}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">URL to Example</Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="Link to your pitch deck, website, social post, etc."
          value={formData.url}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground">Optional, but helpful for our review process</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="story">Your Story</Label>
        <Textarea
          id="story"
          name="story"
          placeholder="How did this strategic language help your company? What impact did it have on fundraising, sales, hiring, etc?"
          rows={5}
          className="resize-none"
          value={formData.story}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground">Tell us about the impact this language had on your business</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="availability">Interview Availability</Label>
        <Input
          id="availability"
          name="availability"
          placeholder="E.g., 'Weekday afternoons' or 'Tuesdays and Thursdays'"
          value={formData.availability}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground">When would you generally be available for a 30-minute interview if selected?</p>
      </div>
      
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="interviewWillingness"
          name="interviewWillingness"
          checked={formData.interviewWillingness}
          onChange={handleCheckboxChange}
          className="mt-1"
        />
        <Label htmlFor="interviewWillingness" className="text-sm">
          I'm willing to participate in an interview about my lingo story if selected
        </Label>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Your Request"}
      </Button>
      
      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree that your story may be featured in our case study library.
        We'll contact you before publishing any details about your company.
      </p>
    </form>
  );
};

export default SubmitForm;
