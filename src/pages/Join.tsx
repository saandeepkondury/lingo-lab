
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JoinHeader from '@/components/Join/JoinHeader';
import LoginForm from '@/components/Join/LoginForm';
import SignupForm from '@/components/Join/SignupForm';
import LoggedInView from '@/components/Join/LoggedInView';

const Join = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <Layout>
        <div className="container max-w-md mx-auto px-6 py-24">
          <LoggedInView />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-md mx-auto px-6 py-24">
        <JoinHeader />

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>

          <TabsContent value="signin">
            <LoginForm />
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            For demo purposes, you can enter any information
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
