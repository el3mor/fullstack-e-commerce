import { useColorModeValue } from '@/components/ui/color-mode';
import { PasswordInput } from '@/components/ui/password-input';
import { Flex, Box, Input, Stack, Button, Field } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userRegister } from '@/app/features/registerSlice';

interface Inputs {
  username: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  })
  .required();

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.register);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => dispatch(userRegister(data));

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
            <Field.Root invalid={!!errors?.username}>
              <Field.Label>Username</Field.Label>
              <Input
                placeholder="John Deo"
                {...register('username')}
                type="text"
                colorPalette={useColorModeValue('gray', 'white')}
              />
              <Field.ErrorText>{errors?.username?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors?.email}>
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="me@example.com"
                {...register('email')}
                type="email"
                colorPalette={useColorModeValue('gray', 'white')}
              />
              <Field.ErrorText>{errors?.email?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors?.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput placeholder="Password" {...register('password')} />
              <Field.ErrorText>{errors?.password?.message}</Field.ErrorText>
            </Field.Root>
            <Stack spaceY={4}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
                loading={loading}
                loadingText="Registering"
              >
                Register
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
