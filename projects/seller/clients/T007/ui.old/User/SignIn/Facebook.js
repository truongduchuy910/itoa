import React from 'react';
import {
  chakra,
  Box,
  GridItem,
  useColorModeValue,
  Button,
  Stack,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  Input,
  Container,
  Spacer,
} from '@chakra-ui/react';

const Heros = () => {
  return (
    <Box my='10%' mx={{sm:'5%', md:'10%', lg:'20%'}}>
      <SimpleGrid columns={{sm:'1',md:'2'}} spacing={{sm:'0', md:'50'}}>
        <GridItem>
        <chakra.h1
            mb={4}
            textAlign={{sm:'center',md:'start'}}
            fontSize='6xl'
            fontWeight="bold"
            columns={{ base: 1, lg: 3 }}
            color='#1877F2'
            letterSpacing={{ base: "normal", md: "tight" }}
          >
            facebook
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize='2xl'
            color="#1C1E21"
          >
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống bạn.
          </chakra.p>
        </GridItem>
        <GridItem>
        <Box as="form" shadow="2xl" bg='#FFFFFF' borderRadius='lg' overflow='hidden'>
            <SimpleGrid
              columns={1}
              spacing={4}
              px='5'
              py='5'
              borderBottom="solid 1px"
              borderColor='#ECEEF0'
            >
              <Flex>
                <Input
                  mt={0}
                  type="email"
                  placeholder="Email hoặc số điện thoại"
                  required="true"
                />
              </Flex>
              <Flex>
                <Input
                  mt={0}
                  type="password"
                  placeholder="Mật khẩu"
                  required="true"
                />
              </Flex>
              <Button color='#FFF' bg='#1877f2' py={2} type="submit" fontWeight='bold' _hover={{bg:'blue.500'}}>
                  Đăng nhập
              </Button>
              <chakra.a color="#1877F2" fontSize='sm' textAlign='center' cursor='pointer' >
              Quên mật khẩu?
            </chakra.a>
            </SimpleGrid>
            <Flex px={6} py={4}>
              <Button
                py={2}
                w="full"
                bg='#41b629'
                fontWeight='bold'
                _hover={{ bg: 'green.400' }}
              >
                <Box color='white'>Tạo tài khoảng mới</Box>
              </Button>
            </Flex>
          </Box>
          <Text as='p' fontSize="sm" textAlign="center" color="gray.600" mt='7'>
            <chakra.a color="black" mr='1' cursor='pointer' fontWeight='semibold'>
              Tạo Trang 
            </chakra.a>
            dành cho người nổi tiếng, nhã hiệu hoặc doanh nghiệp
          </Text>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Heros
