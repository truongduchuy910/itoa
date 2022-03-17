import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';
import { ChevronDownIcon, Icon, UpDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { Fragment } from 'react';
import { AiOutlineTags, AiOutlineUnorderedList } from 'react-icons/ai';

const ProductSidebarSimple = ({
  allProductCategories = [],
  allProductBrands,
  brand: currentBrand,
  category: currentCategory,
  toggleCategory = () => {},
  toggleBrand = () => {},
  onClickProductBrand = brand => {},
  onClickProductCategory = category => {},
}) => {
  return (
    <Fragment>
      <Box borderWidth="1px" borderRadius="lg" boxShadow="md" p={{ base: 2, md: 3 }} mb={2}>
        <Heading size={'xs'} color={'brand.500'}>
          <AiOutlineUnorderedList style={{ marginRight: 5, display: 'inline-block' }} />
          Danh mục
        </Heading>
        <Stack px={0} py={2}>
          {allProductCategories.map(category => (
            <Item
              key={category.id}
              {...category}
              onClickProductCategory={onClickProductCategory}
              currentCategory={currentCategory}
            />
          ))}
        </Stack>
        <IconButton size={'xs'} w={'full'} mt={2} icon={<UpDownIcon />} onClick={toggleCategory} />
      </Box>

      <Box borderWidth="1px" borderRadius="lg" boxShadow="md" p={2} mb={2}>
        <Heading size={'xs'} color={'brand.500'}>
          <AiOutlineTags style={{ marginRight: 5, display: 'inline-block' }} />
          Thương hiệu
        </Heading>{' '}
        <Stack px={0} py={2}>
          {allProductBrands.map(brand => (
            <Stack
              key={brand.id}
              spacing={4}
              onClick={e => {
                onClickProductBrand(brand);
              }}
            >
              <Flex
                py={1}
                as={Link}
                justify={'space-between'}
                align={'center'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                {brand.name && (
                  <Text fontWeight={brand.id === currentBrand?.id ? 900 : 400}>{brand.name}</Text>
                )}
              </Flex>
            </Stack>
          ))}
        </Stack>
        <IconButton size={'xs'} w={'full'} mt={2} icon={<UpDownIcon />} onClick={toggleBrand} />
      </Box>
    </Fragment>
  );
};
export default ProductSidebarSimple;

const Item = props => {
  const { url, name, childs, onClickProductCategory = () => {}, currentCategory } = props;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={childs && onToggle}>
      <Flex
        py={1}
        as={Link}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        {name && (
          <Text
            onClick={e => {
              onClickProductCategory(props);
            }}
            fontWeight={currentCategory === url ? 900 : 200}
          >
            {name}
          </Text>
        )}
        {childs?.length ? (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        ) : null}
      </Flex>

      {childs?.length ? (
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={'gray.700'}
            align={'start'}
          >
            {childs &&
              childs.map(child => (
                <Link
                  key={child.id}
                  fontWeight={currentCategory === child.url ? 900 : 200}
                  py={2}
                  href={child.href}
                  onClick={e => {
                    onClickProductCategory(child);
                  }}
                >
                  {child.name}
                </Link>
              ))}
          </Stack>
        </Collapse>
      ) : null}
    </Stack>
  );
};
