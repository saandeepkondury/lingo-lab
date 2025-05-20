
import { useState } from 'react';
import { X, Linkedin, Mail, Copy, Check, Share2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ShareOptionsProps {
  caseStudy: {
    company: string;
    lingo: string;
    id: string;
  };
  trigger?: React.ReactNode;
}

const ShareOptions = ({ caseStudy, trigger }: ShareOptionsProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const title = `${caseStudy.company}: "${caseStudy.lingo}" Case Study`;
  const url = `${window.location.origin}/case-studies/${caseStudy.id}`;
  
  const shareMessages = {
    twitter: `Check out this strategic narrative case study on ${caseStudy.company}'s use of "${caseStudy.lingo}" from @LingoLab`,
    linkedin: `I found this fascinating case study on ${caseStudy.company}'s strategic narrative using "${caseStudy.lingo}" - a great example of narrative positioning in action.`,
    email: `Subject: Interesting Strategic Narrative Case Study - ${caseStudy.company}\n\nHi,\n\nI thought you might find this case study interesting. It explores how ${caseStudy.company} used the phrase "${caseStudy.lingo}" to position their brand effectively.\n\nCheck it out: ${url}\n\nBest,`
  };
  
  const handleShare = (platform: 'twitter' | 'linkedin' | 'email') => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessages.twitter)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?body=${encodeURIComponent(shareMessages.email)}`;
        break;
    }
    
    window.open(shareUrl, '_blank');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-white">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this case study</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline"
              className="flex justify-start items-center gap-3"
              onClick={() => handleShare('twitter')}
            >
              <X className="h-5 w-5" />
              <span>Share on X.com</span>
            </Button>
            
            <Button 
              variant="outline"
              className="flex justify-start items-center gap-3"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-5 w-5" />
              <span>Share on LinkedIn</span>
            </Button>
            
            <Button 
              variant="outline"
              className="flex justify-start items-center gap-3"
              onClick={() => handleShare('email')}
            >
              <Mail className="h-5 w-5" />
              <span>Share via Email</span>
            </Button>
            
            <Button 
              variant="outline"
              className="flex justify-start items-center gap-3"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareOptions;
