import { Fragment, useState } from 'react';
import { formatMoney } from '../../../utils/chip';
import { gql, useQuery } from '@apollo/client';
import Loading from '../../../elements/Loading';
import Success from './Success';
import { Box, Container, Divider, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/layout';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import ProductCartItemList from '../Cart/Item/List';
import ProductCartItemListSimple from '../Cart/Item/List/Simple';
import { useRouter } from 'next/router';
import { onToast } from '../../../elements/Toast/Simple';
const Checkout = ({
  ProductCart: productCart,
  onOrder = () => {},
  onClickCart = () => {},

  busy,
}) => {
  const [createProductOrder, setCreateProductOrder] = useState();
  /**
   *
   */
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [stress, setStress] = useState('');
  const [note, setNote] = useState('');
  const [code, setCode] = useState('');
  const [payment, setPayment] = useState('cod');
  /**
   *
   */
  var { data, error, loading } = useQuery(
    gql`
      query {
        allPages {
          id
          logo {
            publicUrl
          }
          store
          slogan
          address
          intro
          phone
          email
          contact
          prices
          facebook
          domain
          transfer
          ship
          user {
            id
          }
          shipMoneySupport
        }
      }
    `
  );
  if (loading || error) return <Loading />;

  const [page] = data.allPages;
  var count = 0,
    total = page.shipMoneySupport;
  productCart.items?.map(item => {
    count += item.quantity;
    total += item.quantity * (item.sale ? item.sale : item.price);
  });

  return (
    <Container maxW={'container.xl'} py={34}>
      {createProductOrder ? <Success success={{ createProductOrder }} /> : null}
      <SimpleGrid alignItems={'start'} columns={{ base: 2, md: 2, lg: 3 }} spacing={4}>
        <Stack
          spacing={3}
          borderWidth={'1px'}
          borderRadius={'lg'}
          boxShadow={'sm'}
          p={3}
          //
        >
          <Heading size={'md'}>Thông tin nhận hàng</Heading>
          <Divider />
          <Box>
            <Text>
              Họ tên{' '}
              <Text as={'span'} color={'red'}>
                *
              </Text>
            </Text>
            <Input
              placeholder="Họ tên"
              name="name"
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Text>
              Số điện thoại{' '}
              <Text as={'span'} color={'red'}>
                *
              </Text>
            </Text>
            <Input
              option="Text"
              placeholder="Số điện thoại"
              name="phone"
              onChange={e => {
                setPhone(e.target.value);
              }}
            />
          </Box>
          <Text>
            Địa chỉ{' '}
            <Text as={'span'} color={'red'}>
              *
            </Text>
          </Text>
          <Address onChangeAddress={address => setAddress(address)} />
          <Box>
            <Input
              option="Text"
              placeholder="Tên đường, số nhà, thôn,..."
              onChange={e => {
                setStress(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Text>
              Ghi chú & Thông tin thêm{' '}
              <Text as={'span'} color={'red'}>
                *
              </Text>
            </Text>
            <Text size={'xs'} color={'gray.500'} mb={3}>
              Vui lòng cung cấp thêm thông tin khi không thể liên hệ bạn bằng điện thoại. Ví dụ:
              Instagram, Facebook, Gmail,...
            </Text>

            <Textarea
              option="TextArea"
              label="Ghi chú"
              onChange={e => {
                setNote(e.target.value);
              }}
            />
          </Box>
          <Text>
            <Text as={'span'} color={'red'}>
              *
            </Text>{' '}
            Thông tin bắt buộc
          </Text>
        </Stack>
        <Stack
          spacing={4}
          borderWidth={'1px'}
          borderRadius={'lg'}
          boxShadow={'sm'}
          p={3}
          //
        >
          <Heading size={'md'}>Vận chuyển</Heading>
          <Divider />

          <Box className="box mt-3 mb-4">
            <div dangerouslySetInnerHTML={{ __html: page.ship }}></div>
          </Box>
          <Heading size={'md'}>Thanh toán</Heading>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton
                onClick={() => {
                  setPayment(`cod`);
                }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight={payment === 'cod' ? 'bold' : 'medium'}>
                    📦 Thanh toán khi nhận hàng (COD)
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                Bạn chỉ phải thanh toán khi nhận hàng. Thời gian giao hàng dự kiến từ 2-3 ngày.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                onClick={() => {
                  setPayment(`transfer`);
                }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight={payment === 'transfer' ? 'bold' : 'medium'}>
                    🏦 Chuyển khoản ngân hàn
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <div pb={4} dangerouslySetInnerHTML={{ __html: page.transfer }}></div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>

        <Stack
          spacing={4}
          borderWidth={'1px'}
          borderRadius={'lg'}
          boxShadow={'sm'}
          p={3}
          //
        >
          <Heading size={'md'}>
            Đơn hàng <small>({count} sản phẩm)</small>
          </Heading>
          <Divider />
          <div className="box my-3">
            <ProductCartItemList UI={ProductCartItemListSimple} />
            <Box>
              Tạm tính:{' '}
              <Text style={{ float: 'right' }}>{formatMoney(total - page.shipMoneySupport)}₫</Text>
            </Box>
            <Box mb={5}>
              Vận chuyển:{' '}
              <Text style={{ float: 'right' }}>🚚 {formatMoney(page.shipMoneySupport)}₫</Text>
            </Box>
            <Input
              label="Mã giảm giá"
              placeholder="Mã giảm giá"
              onChange={e => {
                setCode(e.target.value);
              }}
            />
            <h6 style={{ marginTop: 34 }}>
              Tổng cộng:{' '}
              <Text style={{ float: 'right', color: 'var(--color-text-danger)' }}>
                {formatMoney(total)} ₫
              </Text>
            </h6>
          </div>
          <a onClick={() => onClickCart()}>Quay về giỏ hàng</a>
          <Button
            onClick={e => {
              const addr = address ? [stress, address, note].join('.') : '';
              if (!phone) return onToast()(`Vui lòng điền số điện thoại, cảm ơn!`);
              if (!name) return onToast()(`Vui lòng điền thọ tên, cảm ơn!`);
              if (!addr) return onToast()(`Vui lòng điền địa chỉ, cảm ơn!`);
              if (!note) return onToast()(`Vui lòng điền thông tin ghi chú, cảm ơn!`);
              onOrder({
                phone,
                name,
                address: addr,
                payment,
                code,
              })
                .then(({ data: { createProductOrder } }) => {
                  setCreateProductOrder(createProductOrder);
                })
                .catch(errors => {
                  const { graphQLErrors } = errors;
                  graphQLErrors?.map(error => {
                    onToast()(error.message);
                  });
                });
            }}
            variant={'outline'}
            colorScheme={'yellow'}
            bg={'brand.500'}
          >
            Đặt hàng
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
export default Checkout;
const Address = ({ onChangeAddress = address => {} }) => {
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const { data, error, loading, previousData, refetch, variables } = useQuery(
    gql`
      query ($province: String, $district: String) {
        allGhnProvinces {
          name
          key
        }
        allGhnDistricts(code: $province) {
          name
          key
        }
        allGhnWards(code: $district) {
          name
          key
        }
      }
    `,
    { variables: { province: null, district: null } }
  );
  if (!previousData && (loading || error)) return <Loading style={{ minHeight: 120 }} />;
  const { allGhnProvinces, allGhnDistricts, allGhnWards } = data || previousData;
  return (
    <Fragment>
      <Select
        placeholder="Tỉnh/Thành"
        onChange={e => {
          refetch({ ...variables, province: e.target.value });
          setProvince(e.target.options[e.target.selectedIndex].innerText);
          onChangeAddress();
        }}
      >
        {allGhnProvinces?.map((province, index) => {
          return (
            <option key={index} value={province.key} onClick={e => {}}>
              {province.name}
            </option>
          );
        })}
      </Select>
      <Select
        placeholder="Quận/Huyện"
        onChange={e => {
          refetch({ ...variables, district: e.target.value });
          setDistrict(e.target.options[e.target.selectedIndex].innerText);
          onChangeAddress();
        }}
      >
        {allGhnDistricts?.map((district, index) => {
          return (
            <option key={index} value={district.key}>
              {district.name}
            </option>
          );
        })}
      </Select>
      <Select
        placeholder="Phường/Xã"
        onChange={e => {
          const ward = e.target.options[e.target.selectedIndex].innerText;
          onChangeAddress(`${ward} ${district} ${province}`);
        }}
      >
        {allGhnWards?.map((ward, index) => {
          return (
            <option key={index} value={ward.key}>
              {ward.name}
            </option>
          );
        })}
      </Select>
    </Fragment>
  );
};
