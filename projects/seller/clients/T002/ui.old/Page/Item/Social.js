import {
  chakra,
  Stack,
  useColorModeValue,
  VisuallyHidden,
  Icon,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaGoogle,
  FaGooglePlus,
  FaInstagram,
  FaPinterest,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      target={"_blank"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function PageItemSocial({ page = {}, fontSize }) {
  const {
    pageId,
    twitter,
    instagram,
    pinterest,
    youtube,
    facebook,
    googlePlus,
    googleMap,
    zalo,
  } = page;
  return (
    <Stack direction={"row"} spacing={2} fontSize={fontSize}>
      {pageId && (
        <SocialButton label="Facebook" href={"https://facebook.com/" + pageId}>
          <FaFacebook />
        </SocialButton>
      )}
      {twitter && (
        <SocialButton label="twitter" href={twitter}>
          <FaTwitter />
        </SocialButton>
      )}
      {instagram && (
        <SocialButton label="instagram" href={instagram}>
          <FaInstagram />
        </SocialButton>
      )}
      {pinterest && (
        <SocialButton label="pinterest" href={pinterest}>
          <FaPinterest />
        </SocialButton>
      )}
      {youtube && (
        <SocialButton label="youtube" href={youtube}>
          <FaYoutube />
        </SocialButton>
      )}
      {googlePlus && (
        <SocialButton label="googlePlus" href={googlePlus}>
          <FaGooglePlus />
        </SocialButton>
      )}
      {googleMap && (
        <SocialButton label="googleMap" href={googleMap}>
          <FaGoogle />
        </SocialButton>
      )}
      {zalo && (
        <SocialButton label="zalo" href={zalo}>
          <img
            width="18px"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC1ElEQVRoge2avWsUQRjGf16jJHc2KmpEQTSIhUQkKugFA2J1QbCzsPI/EIKCbRSsLFSwCn6R2iJRG6NYWBkREUHExk6MSnQlJqBZi5nNTe723Z3Z271djn1gmLudZ995npuPnZ05KFGiRFKMAbPAb8DPOXlaS8PVxJUCiJfShK2JMX3DEjAObBd4NeBNTmasWuaZJo9HcCrA45xM+KhuFgtPk7dFcC7laMIHftkYCcgS9qK6Xd5jpWMj0wUw0bGRIWClACba9FVsnBm4AKxzvKcrCBPlC2X9wBegmqkie6zR59IiJymOiTa4GDmRkYbjwEgWgaXB/hR54B0TYo1G3NNaT9cG+2BEmRTnh0P81CG1iIfdL/UR2IAajLMW/NZ6M3+O/LUIvoKaFADOG9engcNAH+pZNAzUBSMBt1/nM2kbsWmRe5q7CZg3hEXVZX6WuA9D6oqFRPwcY+IbsEVz7xvXh/W1q8CiziUjAfdaC/dImkaiZi0f1ZVAdS1zGVPT1xf1dy/CiMStxRlxmbXeRZS9AO6gBvlt1j519+n8JmrVfCMiTsC9BSwb3P0OOlchtchp5NY4IMSqk84YeRRSZywkYhV5I2JUiDWiy2dQ/bwPOIiajYKyuvHZ5FZ1HmaiIyMAD4SgeaSOjByioO8jrkYg302HVI0MAn96wQjA5V4xUgGe9IIRgI3AXC8YAdhVFCOuuyit8OIp3UGnRo6moiIjuHSt5xSkayU1shm422Xhr4GzaRv5JFS2BEwBp4DdwBnUS9ZCQvHzwCTN12dRn8tOo4nrqGX9VuAn8AG1Sp0Cvobw19Nc8Q4Be4CdqNVwTRtdAL4D74G3qKn9JfAvgb5Vou0YyQPW028wpUpHbnlih87bDnrCjLzS+bnM5CRHoGnOhtygOXAvAgMZiXLBAOq4bxmlzfqYeoL8ng9xyfp4OkADteVpu1WaZUr8h4ESJUoo/Ae3n8ZpXPgvWQAAAABJRU5ErkJggg=="
          />
        </SocialButton>
      )}
    </Stack>
  );
}
