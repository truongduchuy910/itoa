import { Container } from "@chakra-ui/react";
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import ProductCategoryListSimple from "@itoa/ui/Product/Category/List/Simple";
import CarouselSimple from "@itoa/ui/Carousel/Simple";
import { Fragment } from "react";
import FeatureListSimple from "@itoa/ui/Feature/List/Simple";
import TestimonialList from "@itoa/ui/Testimonial/List";
import TestimonialListGridWithBlurredBackdrop from "@itoa/ui/Testimonial/List/GridWithBlurredBackdrop";
export default function Home() {
  return (
    <Fragment>
      <CarouselSimple />
      <Container maxW="container.xl">
        <FeatureListSimple />
        <ProductCategoryList
          UI={ProductCategoryListSimple}
          columns={{ base: 1, md: 2 }}
        />
      </Container>
      <TestimonialList
        UI={TestimonialListGridWithBlurredBackdrop}
        variant={{
          title: "Đối tác",
          description:
            "Sự hài lòng của khách hàng chính là thành công lớn nhất của chúng tôi",
        }}
      />
    </Fragment>
  );
}
