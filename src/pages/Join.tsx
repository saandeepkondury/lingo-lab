
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CaseStudyCard from '@/components/CaseStudyCard';

// Sample locked case studies
const lockedCaseStudies = [
  {
    id: "open-ai-chatgpt",
    company: "OpenAI",
    lingo: "ChatGPT",
    impact: "Created a new product category that reached 100M users in 2 months",
    rating: 5,
    narrativeType: "Product Launch",
    industry: "AI"
  },
  {
    id: "airbnb-belong-anywhere",
    company: "Airbnb",
    lingo: "Belong Anywhere",
    impact: "Transformed from rental marketplace to global hospitality brand",
    rating: 4.7,
    narrativeType: "Brand Positioning",
    industry: "Consumer"
  },
  {
    id: "slack-where-work-happens",
    company: "Slack",
    lingo: "Where Work Happens",
    impact: "Grew to $27B valuation by positioning as the future of workplace communication",
    rating: 4.8,
    narrativeType: "Market Creation",
    industry: "SaaS"
  }
];

const Join = () => {
  const [activeTab, setActiveTab] = useState('signin');
  
  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                Join the Lingo Library
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Get instant access to high-impact case studies and language strategies from the world's most successful companies.
              </p>
              
              <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-teal-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" />
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">Sign In</Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">Google</Button>
                    <Button variant="outline">LinkedIn</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" type="text" placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" />
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">Create Account</Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">Google</Button>
                    <Button variant="outline">LinkedIn</Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <p className="text-center text-sm text-muted-foreground mt-6">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="text-teal-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-teal-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
            
            <div className="hidden md:block space-y-6">
              <h2 className="text-xl font-medium mb-4">Unlock these case studies:</h2>
              {lockedCaseStudies.map((study) => (
                <div key={study.id} className="relative">
                  <CaseStudyCard {...study} />
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="bg-white p-3 rounded-lg shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 mx-auto">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;
