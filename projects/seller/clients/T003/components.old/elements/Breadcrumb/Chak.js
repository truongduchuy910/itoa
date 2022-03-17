/**
 * 2.0.0
 */
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react';
const BreadcrumbChak = ({ items, onClickItem = item => {}, isCurrentPage }) => {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {items.map((item, index) => {
        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink onClick={() => !item.isCurrentPage && onClickItem(item)}>
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
export default BreadcrumbChak;
