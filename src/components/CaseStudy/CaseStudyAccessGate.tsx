
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCaseStudyAccess } from '@/hooks/useCaseStudyAccess';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudyAccessGateProps {
  caseStudyId: string;
  children: React.ReactNode;
}

const CaseStudyAccessGate = ({ caseStudyId, children }: CaseStudyAccessGateProps) => {
  const { isLoggedIn } = useAuth();
  const { hasAccess, checkIfCaseStudyAccessed, isBasicUser, accessCount } = useCaseStudyAccess();
  const [canAccess, setCanAccess] = useState(false);
  const [hasAccessedBefore, setHasAccessedBefore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      setLoading(true);
      
      if (!isLoggedIn) {
        setCanAccess(false);
        setLoading(false);
        return;
      }

      // Check if user has accessed this case study before
      const accessedBefore = await checkIfCaseStudyAccessed(caseStudyId);
      setHasAccessedBefore(accessedBefore);

      // If they've accessed it before, always allow access
      if (accessedBefore) {
        setCanAccess(true);
        setLoading(false);
        return;
      }

      // Check if they can access new case studies
      const canAccessNew = await hasAccess(caseStudyId);
      setCanAccess(canAccessNew);
      setLoading(false);
    };

    checkAccess();
  }, [caseStudyId, isLoggedIn, hasAccess, checkIfCaseStudyAccessed]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="border-2 border-teal-200 dark:border-teal-700">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 text-teal-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Sign Up for Free Access</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create a free account to access this case study and 10 more each month.
              </p>
              <Button asChild className="bg-teal-500 hover:bg-teal-600">
                <Link to="/join">
                  Get Free Access <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!canAccess && !hasAccessedBefore && isBasicUser) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="border-2 border-orange-200 dark:border-orange-700">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Monthly Limit Reached</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                You've accessed {accessCount}/10 case studies this month.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Upgrade to Professional for unlimited access to all case studies.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link to="/pricing">
                  Upgrade to Professional <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaseStudyAccessGate;
