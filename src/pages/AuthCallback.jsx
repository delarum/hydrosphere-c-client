import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/become-involved', { replace: true });
      window.location.reload(); // refresh auth context
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default AuthCallback;