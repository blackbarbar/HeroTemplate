'use client';

import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
import { Input } from '@heroui/input';
import { Divider } from '@heroui/divider';
import { Github, Mail, Lock, User } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Form } from '@heroui/form';
import { Link } from '@heroui/link';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    setIsLoading(true);
    // Add your signup logic here
  };

  return (
    <div className='h-full flex items-center justify-center sm:px-6 lg:px-8'>
      <Card className='max-w-md' radius='lg' shadow='sm'>
        <CardHeader className='flex-col text-center p-6'>
          <h2 className='text-2xl font-bold text-gray-900'>Account erstellen</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Oder{' '}
            <Link href='/signin' className='text-sm'>
              melde dich mit deinem bestehenden Account an
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

            <Form onSubmit={handleEmailSignUp} className='space-y-4'>
              <Input
                isRequired
                isClearable
                type='text'
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Max Mustermann'
                startContent={<User className='w-4 h-4 text-gray-500' />}
              />
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
              <Input
                isRequired
                isClearable
                type='password'
                label='Passwort bestätigen'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='••••••••'
                startContent={<Lock className='w-4 h-4 text-gray-500' />}
              />
              <Button
                type='submit'
                size='lg'
                radius='sm'
                isLoading={isLoading}
                className='w-full bg-primary text-white hover:bg-primary-dark transition-colors'
              >
                Account erstellen
              </Button>
            </Form>
          </div>
        </CardBody>

        <CardFooter className='text-center p-6'>
          <p className='text-sm text-gray-600'>
            Mit der Registrierung akzeptierst du unsere{' '}
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

export default SignUpPage;
