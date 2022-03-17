import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FacebookProvider, Page, CustomChat } from 'react-facebook';

import { IoLogoFacebook, IoLogoPinterest, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io';
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  Divider,
  Button,
  Heading,
  LinkBox,
} from '@chakra-ui/react';
import { formatMoney } from '../../utils/chip';

export default function InformationFooter({
  allPages,
  allServices,
  allPostHashtags,
  allFeatures,
  allProductCategories,
  // router
  onClickPostHashtag = hashtag => {},
  onClickService = service => {},
  onClickFeature = feature => {},
  onClickProductCategory = category => {},
}) {
  const [page] = allPages;
  return (
    <footer>
      <FacebookProvider appId="145518257438217">
        {page.pageId ? <CustomChat pageId={page.pageId} minimized={true} /> : null}
        <Box mb={0}>
          <Container as={Stack} maxW={'container.xl'} py={10}>
            <SimpleGrid
              columns={{
                sm: 1,
                md: 2,
                lg: 3 + Boolean(allPostHashtags?.length),
              }}
              spacing={8}
            >
              <Stack align={'normal'}>
                <Heading size={'md'}>Thông tin</Heading>
                <Link href={'#'}>
                  {page.store} | {page.slogan}
                </Link>
                <Text textAlign={'justify'}>{page.intro}</Text>
                <Text>{page.description}</Text>

                <Text>{page.contact}</Text>

                <Divider />
                <Box
                  dangerouslySetInnerHTML={{ __html: page.address }}
                  textAlign={'justify'}
                  pb={2}
                />
                <Button as={'a'} href={`tel:${page.phone}`}>
                  Gọi ngay 0{formatMoney(page.phone, 0, '.', '.')}
                </Button>
              </Stack>
              <Stack align={'flex-start'}>
                <Heading size={'md'}>Sản phẩm</Heading>

                {allProductCategories?.map(category => {
                  return (
                    <Link key={category.id} onClick={() => onClickProductCategory(category)}>
                      {category.name}
                    </Link>
                  );
                })}
                {/* <Stack direction={"row"} align={"center"} spacing={2}>
              <Link href={"#"}>Features</Link>
              <Tag
                size={"sm"}
                ml={2}
                
              >
                New
              </Tag>
            </Stack> */}
              </Stack>
              {allPostHashtags?.length ? (
                <Stack align={'flex-start'}>
                  <Heading size={'md'}>Bài viết</Heading>
                  {allPostHashtags?.map(hashtag => {
                    return (
                      <Link key={hashtag.id} onClick={() => onClickPostHashtag(hashtag)}>
                        {hashtag.name}
                      </Link>
                    );
                  })}
                </Stack>
              ) : null}
              <Stack align={'flex-start'}>
                <Heading size={'md'}>Liên kết</Heading>
                {page.embed ? (
                  <div
                    style={{ maxWidth: '100%' }}
                    dangerouslySetInnerHTML={{
                      __html: page.embed,
                    }}
                  />
                ) : (
                  <Page
                    href={page.facebook || `https://facebook.com/${page.pageId}`}
                    tabs="timeline"
                    lazy="true"
                    adaptContainerWidth="true"
                    width={'280'}
                  />
                )}
                <Flex py={4}>
                  {page.twitter && (
                    <Link href={page.twitter} fontSize={'xl'}>
                      <IoLogoTwitter style={{ marginRight: 8 }} />
                    </Link>
                  )}
                  {page.pinterest && (
                    <Link href={page.pinterest} fontSize={'xl'}>
                      <IoLogoPinterest style={{ marginRight: 8 }} />
                    </Link>
                  )}
                  {page.youtube && (
                    <Link href={page.youtube} fontSize={'xl'}>
                      <IoLogoYoutube style={{ marginRight: 8 }} />
                    </Link>
                  )}
                  {page.facebook && (
                    <Link href={page.facebook} fontSize={'xl'}>
                      <IoLogoFacebook style={{ marginRight: 8 }} />
                    </Link>
                  )}
                </Flex>
              </Stack>
            </SimpleGrid>
          </Container>
          <Box py={10}>
            <Flex
              align={'center'}
              _before={{
                content: '""',
                borderBottom: '1px solid',
                borderColor: 'gray.700',
                flexGrow: 1,
                mr: 8,
              }}
              _after={{
                content: '""',
                borderBottom: '1px solid',
                borderColor: 'gray.700',
                flexGrow: 1,
                ml: 8,
              }}
            >
              <img src={page?.logo?.publicUrl} style={{ maxWidth: 200 }} />
            </Flex>
            <Text pt={6} fontSize={'sm'} textAlign={'center'}>
              Made with ❤️ by{' '}
              <Link target="_blank" href="https://seller.itoa.vn">
                Itoa.vn
              </Link>
            </Text>
          </Box>
        </Box>
      </FacebookProvider>
    </footer>
  );
}
