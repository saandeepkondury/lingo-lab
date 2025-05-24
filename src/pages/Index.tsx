
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Always redirect to case studies page, which will handle paid/unpaid logic
  useEffect(() => {
    navigate('/case-studies');
  }, [navigate]);

  // This component will redirect immediately, so we don't need to render anything
  return null;
};

export default Index;
