import { useCookies } from '@/hooks/useCookies';
import { VStack, Avatar, Popover, Portal, Button } from '@chakra-ui/react';
import { toaster } from './toaster';

const Avater = () => {
  const { getCookie, removeCookie } = useCookies();
  const user = getCookie('user');
  console.log(user);
  return (
    <Popover.Root size={'xs'} positioning={{ placement: 'bottom-end' }}>
      <Popover.Trigger>
        <Avatar.Root>
          <Avatar.Image src={''} alt="Avatar" width="40px" height="40px" />
          <Avatar.Fallback name={user.username} />
        </Avatar.Root>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="200px">
            <Popover.Arrow />
            <Popover.Body>
              <VStack>
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  w={'full'}
                  fontSize={'lg'}
                  onClick={() => {
                    removeCookie('jwt');
                    removeCookie('user');
                    toaster.create({
                      title: 'Logout',
                      description: 'You have been logged out successfully',
                      type: 'success',
                      duration: 2000,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }}
                >
                  Logout
                </Button>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default Avater;
