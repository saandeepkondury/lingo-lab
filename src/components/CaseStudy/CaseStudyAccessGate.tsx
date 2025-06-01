
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudyAccessGateProps {
  caseStudyId: string;
  children: React.ReactNode;
}

const CaseStudyAccessGate = ({ caseStudyId, children }: CaseStudyAccessGateProps) => {
  const { isLoggedIn } = useAuth();
  const { subscribed, subscription_tier } = useSubscription();

  // Show premium overlay for non-subscribers
  const showPremiumOverlay = !subscribed && isLoggedIn;
  const showSignUpPrompt = !isLoggedIn;

  if (showSignUpPrompt) {
    return (
      <div className="relative">
        {/* Background content - slightly blurred */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Overlay for sign up prompt */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-md flex items-center justify-center">
          <Card className="border-2 border-teal-200 dark:border-teal-700 max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <Crown className="h-12 w-12 text-teal-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Join Elite Founders
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Access strategic narratives from VC-backed success stories. Join thousands of founders learning from the best.
              </p>
              <Button asChild className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
                <Link to="/join">
                  Start Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showPremiumOverlay) {
    return (
      <div className="relative">
        {/* Background content - slightly blurred */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-md flex items-center justify-center">
          <Card className="border-2 border-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <Crown className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Premium Strategic Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Unlock advanced analysis and strategic patterns used by top VC-backed companies.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get unlimited access to all case studies and exclusive founder insights.
              </p>
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                <Link to="/pricing">
                  Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show full content for subscribers
  return <>{children}</>;
};

export default CaseStudyAccessGate;
