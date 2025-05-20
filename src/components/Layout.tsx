
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustBanner from '@/components/TrustBanner';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {isLoggedIn ? <Navbar /> : <TrustBanner />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
