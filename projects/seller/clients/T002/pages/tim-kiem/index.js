import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Badge, Container, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useState } from 'react';

import ProductList from '../../components/primes/Product/List';
const ProductListSimple = dynamic(() => import('../../components/primes/Product/List/Simple'));

import ProductCategories from '../../components/primes/Product/Category/List';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import dynamic from 'next/dynamic';
import { convertViToEn } from '../../components/utils/chip';
const Search = () => {
  const row = useBreakpointValue({
    base: 'repeat(3, 1fr)',
    md: 'repeat(4, 1fr)',
    lg: 'repeat(6, 1fr)',
  });
  const [value, setValue] = useState('');
  const [more, setMore] = useState(false);
  const handleChange = event => {
    setMore(false);
    setValue(event.target.value);
  };
  const toggle = e => {
    setMore(more => !more);
  };
  return (
    <Container maxW={'container.xl'} py={21}>
      <Container>
        <HStack>
          <Input placeholder="Nhập tên sản phẩm..." my={21} value={value} onChange={handleChange} />
        </HStack>
        <ProductCategories
          UI={({ allProductCategories }) => {
            return allProductCategories?.map(category => {
              return <Badge mr={2}>{category.name}</Badge>;
            });
          }}
        />
      </Container>
      {value ? (
        <Heading size={'md'} mb={21}>
          Tìm nhanh "{value}"
        </Heading>
      ) : null}
      <Grid templateColumns={row} templateRows="repeat(1, 1fr)" gap={2} px={2}>
        {value?.length > 1 ? (
          <ProductList
            UI={ProductListSimple}
            ProductWhereInput={{
              OR: [{ name_contains_i: convertViToEn(value) }, { name_contains_i: value }],
            }}
            first={6}
          />
        ) : null}
      </Grid>
      {more ? (
        <Grid templateColumns={row} templateRows="repeat(1, 1fr)" gap={2} px={2} mt={2}>
          <ProductList
            UI={ProductListSimple}
            ProductWhereInput={{
              OR: [
                { description_contains_i: convertViToEn(value) },
                { guide_contains_i: convertViToEn(value) },
                { description_contains_i: value },
                { guide_contains_i: value },
              ],
            }}
          />
        </Grid>
      ) : null}
      {value ? (
        <Button my={21} onClick={toggle} leftIcon={<ArrowUpDownIcon />}>
          {more ? 'Bớt' : 'Thêm'} kết quả
        </Button>
      ) : null}
    </Container>
  );
};
export default Search;
