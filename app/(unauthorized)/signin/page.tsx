'use client';

import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
import { Input } from '@heroui/input';
import { Divider } from '@heroui/divider';
import { Github, Mail, Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Form } from '@heroui/form';
import { Link } from '@heroui/link';
import { Checkbox } from '@heroui/checkbox';

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // Credentials Login
  };

  return (
    <div className='h-full flex items-center justify-center sm:px-6 lg:px-8'>
      <Card className='max-w-md' radius='lg' shadow='sm'>
        <CardHeader className='flex-col text-center p-6'>
          <h2 className='text-2xl font-bold text-gray-900'>Anmelden</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Oder{' '}
            <Link href='/signup' className='text-sm'>
              erstelle einen neuen Account
            </Link>
          </p>
        </CardHeader>

        <CardBody className='p-6'>
          <div className='flex flex-col gap-6'>
            <Button
              size='lg'
              radius='sm'
              startContent={<Github className='w-5 h-5' />}
              isDisabled={isLoading}
              className='bg-black text-white w-full hover:bg-gray-800 transition-colors'
              onPress={() => {
                setIsLoading(true);
                signIn('github', { callbackUrl: '/' });
              }}
            >
              Mit GitHub fortfahren
            </Button>

            <Divider className='my-4' />

            <Form onSubmit={handleEmailSignIn} className='space-y-4'>
              <Input
                isRequired
                isClearable
                type='email'
                label='E-Mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='name@beispiel.de'
                startContent={<Mail className='w-4 h-4 text-gray-500' />}
              />
              <Input
                isRequired
                isClearable
                type='password'
                label='Passwort'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                startContent={<Lock className='w-4 h-4 text-gray-500' />}
              />
              <div className='w-full flex items-center justify-between'>
                <Checkbox name='remember'>
                  <p className='text-sm'>Angemeldet bleiben</p>
                </Checkbox>
                <Link href='/forgot-password' className='text-sm'>
                  Passwort vergessen?
                </Link>
              </div>
              <Button
                type='submit'
                size='lg'
                radius='sm'
                isLoading={isLoading}
                className='w-full bg-primary text-white hover:bg-primary-dark transition-colors'
              >
                Anmelden
              </Button>
            </Form>
          </div>
        </CardBody>

        <CardFooter className='text-center p-6'>
          <p className='text-sm text-gray-600'>
            Mit der Anmeldung akzeptierst du unsere{' '}
            <Link href='/terms' className='text-sm'>
              Nutzungsbedingungen
            </Link>{' '}
            und{' '}
            <Link href='/privacy' className='text-sm'>
              Datenschutzerklärung
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
