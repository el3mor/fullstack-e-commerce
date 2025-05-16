import { Steps, VStack } from '@chakra-ui/react';

const OrderSteps = ({ step = 1 }: { step?: number }) => {
  return (
    <Steps.Root defaultStep={step} count={steps.length} w={'4xl'} mx="auto">
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title} display="flex">
            <VStack>
              <Steps.Indicator />
              <Steps.Title fontSize={'lg'}>{step.title}</Steps.Title>
            </VStack>

            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  );
};

const steps = [
  {
    title: 'Cart',
    description: 'Step 1 description',
  },
  {
    title: 'Checkout',
    description: 'Step 2 description',
  },
  {
    title: 'Complete Order',
    description: 'Step 3 description',
  },
];

export default OrderSteps;
