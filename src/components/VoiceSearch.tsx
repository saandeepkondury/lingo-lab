
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceSearchProps {
  onSearchResult?: (transcript: string) => void;
  className?: string;
  redirectOnResult?: boolean;
}

// Mock SpeechRecognition API if not available
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
  console.warn('SpeechRecognition API is not supported in this browser');
}

const VoiceSearch = ({ 
  onSearchResult, 
  className = '', 
  redirectOnResult = true 
}: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const startListening = () => {
    setError('');
    setTranscript('');
    setIsListening(true);
    
    // In a real implementation, we'd initialize SpeechRecognition here
    // For this demo, we'll simulate the process with a timeout
    setTimeout(() => {
      const mockTranscript = "innovative business models";
      setTranscript(mockTranscript);
      setIsListening(false);
      
      if (onSearchResult) {
        onSearchResult(mockTranscript);
      }
      
      if (redirectOnResult) {
        navigate(`/case-studies`);
      }
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
    // In a real implementation, we'd stop the SpeechRecognition here
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Button
        variant={isListening ? "destructive" : "outline"}
        className="rounded-full h-16 w-16 flex items-center justify-center"
        onClick={isListening ? stopListening : startListening}
        disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
      >
        {isListening ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      <p className="mt-2 text-sm text-muted-foreground">
        {isListening 
          ? "Listening..." 
          : "Say a lingo, company, or phrase…"}
      </p>
      
      {transcript && (
        <div className="mt-4 p-3 bg-muted rounded-lg w-full max-w-md">
          <p className="font-medium text-center">"{transcript}"</p>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
      
      {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <p className="mt-2 text-xs text-destructive">
          Voice recognition not supported in your browser
        </p>
      )}
    </div>
  );
};

export default VoiceSearch;
