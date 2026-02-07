import { Box, Button, Center, Text, Title } from '@mantine/core';
import { memo } from 'react';
import { trpcService } from './sdk/trpc-service';

export const TrpcUserList = memo(() => {
  const userListQuery = trpcService.userList.useQuery();
  const userCreator = trpcService.userCreate.useMutation();

  return (
    <Center>
      <Box p="xl">
        <Title order={2}>tRPC Service / User List</Title>
        <Box p="md">
          {userListQuery.data?.map((user) => (
            <Text key={user.id} ta="center">
              {user.id}: {user.name}
            </Text>
          ))}
        </Box>
        <Center>
          <Button
            type="button"
            onClick={() =>
              userCreator.mutate(
                { name: Math.random().toString().replace('0.', '') },
                {
                  onSuccess: () => {
                    userListQuery.refetch();
                  },
                },
              )
            }
          >
            Add User
          </Button>
        </Center>
      </Box>
    </Center>
  );
});

TrpcUserList.displayName = 'TrpcUserList';
