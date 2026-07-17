import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerSchema, type RegisterFormValues } from '@/schemas/auth.schema';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/utils';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      toast.success('Account created!');
      navigate('/', { replace: true });
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
          <h1 className="text-xl font-bold text-gray-900">Create your BookStore account</h1>
          <p className="mt-1 text-sm text-gray-500">Sign up to save favorites and track your reads</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" placeholder="Jane Doe" error={errors.name?.message} {...register('name')} />
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
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-gray-500">
          <Link to="/" className="font-medium text-brand-600 hover:underline">
            Continue browsing without an account
          </Link>
        </p>
      </div>
    </div>
  );
}
