import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/utils';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
            📖
          </div>
          <h1 className="text-xl font-bold text-gray-900">Sign in to BookHub</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and discover your favorite books</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          <p className="font-medium text-gray-600">Demo credentials</p>
          <p>Admin: admin@bookstore.com / Admin@123</p>
          <p>User: alice@example.com / User@123</p>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          <Link to="/" className="font-medium text-brand-600 hover:underline">
            Continue browsing without an account
          </Link>
        </p>
      </div>
    </div>
  );
}
