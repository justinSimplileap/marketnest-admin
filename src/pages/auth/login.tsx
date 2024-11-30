import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import LoginLayout from '~/components/layout/LoginLayout';
import { useState } from 'react';
import { login } from '~/services/api/auth';
import LocalStorageService from '~/services/LocalStorageService';
import Logo from '~/assets/logo/jpmarket.png';
import Image from 'next/image';
import Link from 'next/link';
import Banner from '../../../public/images/grids/grid-01.svg';
import mail from '../../../public/images/icon/mail.svg';
import password from '../../../public/images/icon/password.svg';

type FormValues = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await login(data);
      if (response.status === 'success') {
        const { token, jpid } = response.data;

        LocalStorageService.setToken(token);
        LocalStorageService.setItem('jpid', jpid);

        router.push('/dashboard');
      } else {
        setErrorMessage(response.message || 'Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage(
        error?.response?.data?.message || 'An unexpected error occurred.'
      );
    }
  };

  return (
    <LoginLayout>
      <div className="">
        <div className=" bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex flex-wrap items-center">
            <div className="w-full xl:w-1/2">
              <div className="w-full p-4 sm:p-12.5 xl:p-15">
                <div className="flex  flex-col justify-center -mt-10">
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                      className="space-y-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2.5 block font-medium text-dark dark:text-white"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            {...register('email', {
                              required: 'Email is required',
                            })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
                            <Image
                              width={22}
                              height={22}
                              src={mail}
                              alt="mail"
                            />
                          </span>
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 ml-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Password Field */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="mb-2.5 block font-medium text-dark dark:text-white"
                          >
                            Password
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...register('password', {
                              required: 'Password is required',
                            })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
                            <Image
                              width={22}
                              height={22}
                              src={password}
                              alt="mail"
                            />
                          </span>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1 ml-1">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      {/* Error Message */}
                      {errorMessage && (
                        <p className="text-red-500 text-sm text-center mt-4">
                          {errorMessage}
                        </p>
                      )}

                      {/* Submit Button */}
                      <div>
                        <button
                          type="submit"
                          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                        >
                          Log in
                        </button>
                      </div>
                    </form>

                    {/* Signup Link */}
                    <div className="mt-4 text-center">
                      <Link
                        href="/auth/signup"
                        className="text-blue-500 hover:underline"
                      >
                        Don't have an account? Sign up.
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
              <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
                <Link className="mb-5 inline-block" href="/">
                  <Image
                    className="hidden dark:block"
                    src={Logo}
                    alt="Logo"
                    width={106}
                    height={32}
                  />
                  <Image
                    className="dark:hidden"
                    src={Logo}
                    alt="Logo"
                    width={106}
                    height={32}
                  />
                </Link>
                <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                  Sign in to your account
                </p>

                <h1 className="mb-3 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                  Welcome Back!
                </h1>

                <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                  Please sign in to your account by completing the necessary
                  fields below
                </p>

                <div className="mt-4">
                  <Image
                    src={Banner}
                    alt="Logo"
                    width={405}
                    height={325}
                    className="mx-auto dark:opacity-30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default AdminLogin;
