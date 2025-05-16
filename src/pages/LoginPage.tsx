import { useColorModeValue } from '@/components/ui/color-mode';
import { PasswordInput } from '@/components/ui/password-input';
import { Flex, Box, Input, Checkbox, Stack, Button, Field, Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userLogin } from '@/app/features/loginSlice';
import { useCookies } from '@/hooks/useCookies';
import { useState } from 'react';

interface Inputs {
  identifier: string;
  password: string;
}

const schema = yup
  .object({
    identifier: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const LoginPage = () => {
  const { setCookie } = useCookies();
  const [isRememberMe, setIsRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.login) as {
    data: { jwt: string; user: object } | null;
    loading: boolean;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (submitData) => {
    dispatch(userLogin(submitData));
    setTimeout(() => {
      if (data) {
        const cookieOptions = isRememberMe ? { maxAge: 60 * 60 * 24 * 7 } : undefined;
        setCookie('jwt', data.jwt, { ...cookieOptions, path: '/' });
        setCookie('user', JSON.stringify(data.user), { ...cookieOptions, path: '/' });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    }, 1000);
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack mx={'auto'} maxW={'xl'} py={12} px={6}>
        <Box
          w={'md'}
          h={'2/3'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box
            onSubmit={handleSubmit(onSubmit)}
            as="form"
            w={'full'}
            h={'full'}
            display={'flex'}
            flexDir={'column'}
            gap={6}
          >
            <Field.Root invalid={!!errors?.identifier}>
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="me@example.com"
                {...register('identifier', { required: true })}
                type="email"
                colorPalette={useColorModeValue('gray', 'white')}
              />
              <Field.ErrorText>{errors?.identifier?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors?.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput placeholder="Password" {...register('password', { required: true })} />
              <Field.ErrorText>{errors?.password?.message}</Field.ErrorText>
            </Field.Root>
            <Stack spaceY={4}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox.Root
                  checked={isRememberMe}
                  onCheckedChange={(e) => setIsRememberMe(!!e.checked)}
                  variant={'subtle'}
                  colorPalette={useColorModeValue('gray', 'white')}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />

                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
                loading={loading}
                loadingText="Logging in"
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
