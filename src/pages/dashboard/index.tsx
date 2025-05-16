import { Card, Flex, Heading, Icon } from '@chakra-ui/react';
import { FaBox, FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useColorMode } from '@/components/ui/color-mode';

const DashboardCard = [
  {
    title: 'Products',
    icon: <FaBox />,
    count: 10,
    link: '/dashboard/products',
  },
  {
    title: 'Categories',
    icon: <FaBox />,
    count: 10,
    link: '/dashboard/categories',
  },
  {
    title: 'Orders',
    icon: <FaCartPlus />,
    count: 10,
    link: '/dashboard/orders',
  },
];

const DashboardPage = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      flexDirection={'column'}
      gap={100}
      justifyContent={'center'}
      alignItems={'center'}
      h={'100%'}
      mt={10}
      w={'100%'}
    >
      <Heading fontSize={'6xl'} fontWeight={'bold'} textAlign={'center'}>
        Dashboard
      </Heading>
      <Flex
        flexWrap={'wrap'}
        gap={5}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        w={'100%'}
      >
        {DashboardCard.map((card) => (
          <Link to={card.link} key={card.title}>
            <Card.Root
              w={'350px'}
              h={'200px'}
              _hover={{
                textDecoration: 'none',
                boxShadow: 'lg',
                bg: colorMode !== 'light' ? 'gray.950' : 'gray.300',
              }}
              transitionDuration="0.2s"
              bg="none"
            >
              <Card.Body
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                w={'100%'}
                h={'100%'}
              >
                <Icon fontSize={'4xl'}>{card.icon}</Icon>
                <Card.Title fontSize={'4xl'} fontWeight={'bold'}>
                  {card.title}
                </Card.Title>
                <Card.Description>Explore {card.title}</Card.Description>
              </Card.Body>
            </Card.Root>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
