import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useState } from "react";

import ProductOrderItemSimple from "@itoa/ui/Product/Order/Item/Simple";
export const Success = ({ success: { createProductOrder } }) => {
  const [open, setOpen] = useState(true);
  var total = 0;
  var save = 0;
  createProductOrder.items?.map((item) => {
    const price = (item.sale ? item.sale : item.price) * item.quantity;
    save = save + (item.sale ? item.price - item.sale : 0);
    total = total + price;
  });
  const router = useRouter();

  return (
    open && (
      <div
        style={{
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.3)",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "95vw",
            height: "80vh",

            maxWidth: 400,
            maxHeight: 740,
            opacity: 1,
            padding: 13,
            borderRadius: 15,
            overflowY: "auto",
          }}
        >
          {/* <CloseIcon
            onClick={() => {
              setOpen(false);
              router.push("/don-hang");
            }}
          /> */}

          <ProductOrderItemSimple {...createProductOrder} />
          <HStack>
            <Button
              isFullWidth
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
            >
              Về trang chủ
            </Button>
            <Button
              isFullWidth
              onClick={() => {
                setOpen(false);
                router.push("/don-hang");
              }}
            >
              Xem đơn hàng
            </Button>
          </HStack>
        </div>
        <style jsx>{`
          .var {
            margin-right: 13px;
            text-decoration: underline;
          }
          span,
          b {
            font-size: 18px;
          }
        `}</style>
      </div>
    )
  );
};
export default Success;
