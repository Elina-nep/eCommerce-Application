import { LoginForm } from '../../components/auth/LoginForm';
import { Blob } from '../../components/blob/Blob';

export const LoginPage: React.FC = () => {
  return (
    <div>
      <LoginForm />
      <Blob componentHue={183} />
    </div>
  );
};
