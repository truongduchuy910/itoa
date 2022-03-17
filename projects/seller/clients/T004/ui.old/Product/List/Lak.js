import { useState, useMemo } from "react";
import ProductItem from "../Item/index";
import LakDetail from "../Item/LakDetail";
import Image from "next/image";
import { Box, Link, SimpleGrid, Skeleton, Square } from "@chakra-ui/react";
import NextLink from "next/link";
import Field from "@itoa/ui/Field";
import { Fragment } from "react";
const Lak = ({ allProducts, _allProductsMeta, onClickMore, loading }) => {
  return (
    <Fragment>
      {!allProducts?.length &&
        (_allProductsMeta.count ? (
          <Skeleton minH="50vh" my={5} />
        ) : (
          "Không có kết quả"
        ))}
      <SimpleGrid columns={{ base: 2, md: 3 }} gap={2}>
        {allProducts?.map((product, index) => {
          return <Item key={product.id + index} product={product} />;
        })}
      </SimpleGrid>
      <Box>
        {_allProductsMeta?.count > allProducts?.length && (
          <Square
            w={200}
            h={200}
            padding={5}
            borderWidth="1px"
            my={5}
            cursor="pointer"
            onClick={() => {
              onClickMore();
            }}
          >
            Xem thêm
          </Square>
        )}
      </Box>
    </Fragment>
  );
};
export default Lak;

const LakQuickView = ({ onclose = () => {}, product }) => {
  return (
    <div
      className="modal fade in"
      id="quick-view-modal"
      tabIndex={-1}
      role="dialog"
      aria-hidden="false"
      style={{ display: "block", paddingRight: "15px" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title ">Thông tin sản phẩm</h4>
            <button
              type="button"
              className="closeModal"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                onclose();
              }}
            />
          </div>
          <div className="modal-body">
            <ProductItem
              UI={LakDetail}
              quickview={true}
              ProductWhereInput={{ url: product.url }}
            />
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
      <style jsx>{`
        a {
          background-color: transparent;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        img {
          border: 0;
        }
        button,
        input,
        select {
          margin: 0;
          font: inherit;
          color: inherit;
        }
        button {
          overflow: visible;
        }
        button,
        select {
          text-transform: none;
        }
        button {
          -webkit-appearance: button;
          cursor: pointer;
        }
        button[disabled] {
          cursor: default;
        }
        button::-moz-focus-inner,
        input::-moz-focus-inner {
          padding: 0;
          border: 0;
        }
        input {
          line-height: normal;
        }
        @media print {
          *,
          :after,
          :before {
            color: #000 !important;
            text-shadow: none !important;
            background: 0 0 !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
          }
          a,
          a:visited {
            text-decoration: underline;
          }
          a[href]:after {
            content: " (" attr(href) ")";
          }
          a[href^="#"]:after {
            content: "";
          }
          img {
            page-break-inside: avoid;
          }
          img {
            max-width: 100% !important;
          }
          h3 {
            orphans: 3;
            widows: 3;
          }
          h3 {
            page-break-after: avoid;
          }
        }
        * {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        :after,
        :before {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        button,
        input,
        select {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        a {
          color: #337ab7;
          text-decoration: none;
        }
        a:focus,
        a:hover {
          color: #23527c;
          text-decoration: underline;
        }
        a:focus {
          outline: 5px auto -webkit-focus-ring-color;
          outline-offset: -2px;
        }
        img {
          vertical-align: middle;
        }
        [role="button"] {
          cursor: pointer;
        }
        h3,
        h4 {
          font-family: inherit;
          font-weight: 500;
          line-height: 1.1;
          color: inherit;
        }
        h3 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h4 {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        h3 {
          font-size: 24px;
        }
        h4 {
          font-size: 18px;
        }
        ul {
          margin-top: 0;
          margin-bottom: 10px;
        }
        .container-fluid {
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
        }
        .row {
          margin-right: -15px;
          margin-left: -15px;
        }
        .col-lg-5,
        .col-lg-7,
        .col-md-6 {
          position: relative;
          min-height: 1px;
          padding-right: 15px;
          padding-left: 15px;
        }
        @media (min-width: 992px) {
          .col-md-6 {
            float: left;
          }
          .col-md-6 {
            width: 50%;
          }
        }
        @media (min-width: 1200px) {
          .col-lg-5,
          .col-lg-7 {
            float: left;
          }
          .col-lg-7 {
            width: 58.33333333%;
          }
          .col-lg-5 {
            width: 41.66666667%;
          }
        }
        label {
          display: inline-block;
          max-width: 100%;
          margin-bottom: 5px;
          font-weight: 700;
        }
        .fade {
          opacity: 0;
          -webkit-transition: opacity 0.15s linear;
          -o-transition: opacity 0.15s linear;
          transition: opacity 0.15s linear;
        }
        .fade.in {
          opacity: 1;
        }
        .modal {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1050;
          display: none;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
          outline: 0;
        }
        .modal.fade .modal-dialog {
          -webkit-transition: -webkit-transform 0.3s ease-out;
          -o-transition: -o-transform 0.3s ease-out;
          transition: transform 0.3s ease-out;
          -webkit-transform: translate(0, -25%);
          -ms-transform: translate(0, -25%);
          -o-transform: translate(0, -25%);
          transform: translate(0, -25%);
        }
        .modal.in .modal-dialog {
          -webkit-transform: translate(0, 0);
          -ms-transform: translate(0, 0);
          -o-transform: translate(0, 0);
          transform: translate(0, 0);
        }
        .modal-open .modal {
          overflow-x: hidden;
          overflow-y: auto;
        }
        .modal-dialog {
          position: relative;
          width: auto;
          margin: 10px;
        }
        .modal-content {
          position: relative;
          background-color: #fff;
          -webkit-background-clip: padding-box;
          background-clip: padding-box;
          border: 1px solid #999;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          outline: 0;
          -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
        }
        .modal-header {
          padding: 15px;
          border-bottom: 1px solid #e5e5e5;
        }
        .modal-title {
          margin: 0;
          line-height: 1.42857143;
        }
        .modal-body {
          position: relative;
          padding: 15px;
        }
        @media (min-width: 768px) {
          .modal-dialog {
            width: 600px;
            margin: 30px auto;
          }
          .modal-content {
            -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
          }
        }
        @media (min-width: 992px) {
          .modal-lg {
            width: 900px;
          }
        }
        .clearfix:after,
        .clearfix:before,
        .container-fluid:after,
        .container-fluid:before,
        .modal-header:after,
        .modal-header:before,
        .row:after,
        .row:before {
          display: table;
          content: " ";
        }
        .clearfix:after,
        .container-fluid:after,
        .modal-header:after,
        .row:after {
          clear: both;
        }
        .pull-right {
          float: right !important;
        }
        .hidden {
          display: none !important;
        }
        .owl-carousel,
        .owl-carousel .owl-item {
          -webkit-tap-highlight-color: transparent;
          position: relative;
        }
        .owl-carousel {
          display: none;
          width: 100%;
          z-index: 1;
        }
        .owl-carousel .owl-stage {
          position: relative;
        }
        .owl-carousel .owl-stage:after {
          content: ".";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .owl-carousel .owl-stage-outer {
          position: relative;
          overflow: hidden;
        }
        .owl-carousel .owl-controls .owl-dot,
        .owl-carousel .owl-controls .owl-nav .owl-next,
        .owl-carousel .owl-controls .owl-nav .owl-prev {
          cursor: pointer;
          cursor: hand;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .owl-carousel.owl-loaded {
          display: block;
        }
        .owl-carousel .owl-item {
          min-height: 1px;
          float: left;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .owl-carousel .owl-item img {
          display: block;
          width: 100%;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }
        .slides {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .flexslider {
          padding: 0;
          margin: 0 0 60px;
          background: #fff;
          border: 4px solid #fff;
          position: relative;
          zoom: 1;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          -webkit-box-shadow: "" 0 1px 4px rgba(0, 0, 0, 0.2);
          -moz-box-shadow: "" 0 1px 4px rgba(0, 0, 0, 0.2);
          -o-box-shadow: "" 0 1px 4px rgba(0, 0, 0, 0.2);
          box-shadow: "" 0 1px 4px rgba(0, 0, 0, 0.2);
        }
        .flexslider .slides:after {
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .flexslider .slides {
          zoom: 1;
        }
        .flexslider .slides img {
          width: 100%;
          display: block;
          height: auto;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        a,
        button {
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        a:focus,
        button:focus {
          text-decoration: none;
          outline: none;
        }
        a:focus,
        a:hover {
          text-decoration: none;
          color: #86590d;
        }
        a,
        button,
        input {
          outline: medium none;
          color: #434343;
        }
        h3,
        h4 {
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h3 {
          font-size: 24px;
        }
        h4 {
          font-size: 18px;
        }
        ul {
          margin: 0px;
          padding: 0px;
        }
        label {
          font-size: 15px;
          font-weight: 400;
          color: #626262;
        }
        *::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        select {
          width: 100%;
          border: 2px solid #eceff8;
          height: 45px;
          padding-left: 10px;
          box-shadow: none;
          font-size: 14px;
          color: #626262;
        }
        option {
          background: #fff;
          border: 0px solid #626262;
          padding-left: 10px;
          font-size: 14px;
        }
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .product-price {
          position: relative;
        }
        .modal-header {
          border: none;
          padding: 0;
        }
        .modal-body {
          padding: 34px 20px 0 20px;
          position: relative;
        }
        #quick-view-modal {
          background: rgba(0, 0, 0, 0.31);
          z-index: 9999;
        }
        div#quick-view-modal .modal-dialog.modal-lg {
          padding-top: 20px;
        }
        h4.modal-title {
          color: #fff;
          font-size: 20px;
          text-align: center;
          text-transform: uppercase;
        }
        #quick-view-modal .selector-wrapper label {
          width: 25%;
        }
        .closeModal {
          position: absolute;
          width: 35px;
          height: 35px;
          border: none;
          top: -15px;
          right: -15px;
          z-index: 10;
          background: url(//bizweb.dktcdn.net/100/347/891/themes/710583/assets/fancybox_sprite.png?1612716331987)
            top left no-repeat !important;
        }
        #quick-view-modal .selector-wrapper {
          width: 100%;
          float: left;
          margin: 0px 0px 10px 0px;
        }
        .m-sku,
        .m-vendor {
          padding: 5px 0px;
        }
        #quick-view-modal .form-input {
          float: left;
          width: 300px;
          max-width: 100%;
          padding: 0px;
        }
        #quick-view-modal .qv-readmore a {
          color: #b00000 !important;
          font-weight: bold;
          font-size: 15px !important;
        }
        #quick-view-modal .qv-readmore {
          float: left;
          padding: 12px 0px;
        }
        #quick-view-modal .actionQVC button {
          margin-right: 10px;
        }
        #quick-view-modal .form-input:last-child {
          margin-top: 0px;
        }
        #quick-view-modal .modal-body {
          padding: 10px 0;
        }
        #quick-view-modal .form-input input[type="number"] {
          max-width: 100px;
          text-align: left;
          padding: 0 15px;
          border: 1px solid #e5e5e5;
          border-radius: 0;
          height: 35px;
        }
        #quick-view-modal .qv-readmore a {
          color: #86590d;
          font-weight: normal;
          font-size: 15px;
        }
        #quick-view-modal .qv-readmore {
          float: left;
          padding: 22px 10px;
        }
        #quick-view-modal .modal-content {
          border-radius: 2px;
        }
        #quick-view-modal div#p-sliderproduct {
          width: 300px;
          margin: auto;
        }
        #quick-view-modal li.product-thumb {
          float: none;
          display: block !important;
          padding: 0;
          width: 100%;
        }
        #quick-view-modal li.product-thumb.active {
          border-color: #86590d;
        }
        #quick-view-modal .image-zoom.row {
          text-align: center;
        }

        .form-input.vid {
          padding: 0px !important;
        }
        .m-vendor,
        .m-sku {
          font-style: italic;
        }
        .form-input.vid span {
          font-size: 14px;
          font-weight: bold;
          font-style: normal !important;
        }
        #quick-view-modal {
          background: rgba(0, 0, 0, 0.31);
          z-index: 9999;
        }
        #quick-view-modal .selector-wrapper label {
          width: 25%;
        }
        #quick-view-modal .selector-wrapper {
          width: 100%;
          float: left;
          display: none;
        }
        #quick-view-modal .form-input {
          float: left;
          width: 300px;
          width: 100%;
          max-width: 100%;
          padding: 10px 0px;
        }
        #quick-view-modal .modal-body {
          padding: 10px 0;
        }
        #quick-view-modal .form-input input[type="number"] {
          text-align: left;
          padding: 0 15px;
          border-radius: 5px;
          border: 1px solid #e5e5e5;
        }
        button.btn-addcart {
          float: left;
          height: 40px;
          border: none;
          padding: 10px 30px;
          background: #86590d;
          color: #fff;
          font-size: 15px;
          transition: color 300ms ease-in-out 0s,
            background-color 300ms ease-in-out 0s,
            background-position 300ms ease-in-out 0s;
          border: 1px solid #fff;
          outline: none;
          line-height: 1;
          cursor: pointer;
        }
        button.btn-addcart:hover {
          background: #fff;
          border-color: #86590d;
          color: #86590d;
        }
        #quick-view-modal .qv-readmore {
          float: left;
          padding: 12px 10px;
        }
        #quick-view-modal .p-price {
          font-size: 20px;
          margin-right: 10px;
        }
        #quick-view-modal .modal-content {
          border: none;
        }
        #quick-view-modal .modal-content {
          border-radius: 2px;
        }
        #quick-view-modal del {
          font-size: 14px;
          display: inline-block;
          margin-top: 5px;
        }
        #quick-view-modal div#p-sliderproduct {
          width: 348px;
          margin: auto;
        }
        #quick-view-modal .product-thumb:hover a:after,
        #quick-view-modal .product-thumb.active a:after {
          border-top: 5px solid rgba(224, 85, 68, 0) !important;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 6px solid #ff0000;
          content: "";
          position: absolute;
          top: -12px;
          left: 0px;
          right: 0px;
          margin: auto;
          width: 6px;
        }
        #quick-view-modal li.product-thumb {
          border: 1px solid #ccc;
        }
        #quick-view-modal li.product-thumb img {
          max-width: 100%;
        }
        #quick-view-modal .image-zoom.row {
          text-align: center;
        }
        #quick-view-modal .image-zoom > img {
          margin-bottom: 5px;
        }
        div#quick-view-modal .modal-header {
          background: #86590d;
          padding: 10px;
        }
        #quick-view-modal .product-price {
          padding: 5px 0px 0px;
          margin: 0;
          border: none;
        }
        #quick-view-modal .form-des {
          display: block;
          float: left;
          line-height: 1.4;
          padding: 0px;
          border: 1px;
          border-right: none;
          border-left: none;
          max-height: 95px;
          overflow: hidden;
          width: 100%;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          -webkit-box-pack: center;
          overflow-wrap: break-word;
          margin-bottom: 15px;
        }
        #quick-view-modal .p-price {
          color: #000 !important;
        }

        #quick-view-modal .form-input input[type="number"] {
          border: 1px solid #ccc;
        }
        #quick-view-modal .owlDesign .owl-controls .owl-dots {
          display: none !important;
        }
        div#quick-view-modal.in {
          opacity: 1;
        }
        .owlDesign.owl-carousel .owl-controls .owl-nav div {
          width: 30px;
          height: 50px;
          font-size: 50px;
          line-height: 40px;
          text-align: center;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid;
          border-color: #86590d;
          color: #86590d;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.4s ease-in-out 0s;
          -moz-transition: all 0.4s ease-in-out 0s;
          -o-transition: all 0.4s ease-in-out 0s;
          -webkit-transition: all 0.4s ease-in-out 0s;
          -ms-transition: all 0.4s ease-in-out 0s;
          font-family: -webkit-body;
          opacity: 0;
          filter: alpha(opacity=0);
          visibility: hidden;
        }
        .owlDesign:hover .owl-controls .owl-nav div {
          opacity: 1;
          filter: alpha(opacity=100);
          visibility: visible;
        }
        .owlDesign:hover .owl-controls .owl-nav div:hover {
          background: #86590d;
          color: #fff;
        }
        .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-next {
          right: -30px;
        }
        .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-prev {
          left: -30px;
        }
        .owlDesign:hover .owl-controls .owl-nav div.owl-next {
          right: 0px;
        }
        .owlDesign:hover .owl-controls .owl-nav div.owl-prev {
          left: 0px;
        }
        .owlDesign .owl-controls .owl-dots {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 5px;
          line-height: 1;
          font-size: 0;
          padding: 5px;
          background: #f4f8fa;
          display: none !important;
        }
        .owlDesign .owl-controls .owl-dots .owl-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: transparent;
          border: 1px solid;
          border-color: #86590d;
          margin: 0px 3px;
          line-height: 1;
        }
        .owlDesign .owl-controls .owl-dots .owl-dot.active {
          background: #86590d;
        }
        .hidden {
          display: none !important;
        }
        .flexslider {
          margin: 0;
          background: 0;
          border: 0;
          border-radius: 0;
        }
        img {
          max-width: 100%;
        }
        button.btn-addcart {
          border-radius: 4px;
        }
        .selector-wrapper {
          display: none;
        }
        .p-option-wrapper {
          display: none !important;
        }
        div#quick-view-modal .p-option-wrapper {
          display: block !important;
        }
        #quick-view-modal .selector-wrapper {
          width: auto;
          float: none;
          display: block;
          margin-bottom: 10px;
        }
        #quick-view-modal .selector-wrapper label {
          display: inline-block;
          min-width: 100px;
          vertical-align: middle;
        }
        #quick-view-modal .selector-wrapper label + span {
          display: inline-block;
          vertical-align: middle;
        }
        #quick-view-modal .form-input.qty label {
          display: inline-block;
          min-width: 100px;
          vertical-align: middle;
        }
        #quick-view-modal .selector-wrapper select {
          border: 1px solid #ccc;
          display: block;
          margin-top: 4px;
          height: 35px;
          outline: 0;
          min-width: 100px;
        }
        .image-feature {
          width: 100%;
          heith: auto;
        }
        #quick-view-modal .form-input.qty label {
          display: inline-block;
          min-width: 123px;
          vertical-align: middle;
        }
        #quick-view-modal .selector-wrapper select {
          border: 1px solid #ccc;
          display: block;
          margin-top: 4px;
          height: 35px;
          outline: 0;
          min-width: 100px;
        }
        .selector-wrapper {
          display: none;
        }
        ul {
          list-style-position: inside;
        }
        input[type="number"] {
          -webkit-appearance: none;
          border-radius: 0;
        }
        @media only screen and (min-width: 992px) and (max-width: 1199px) {
          .owl-carousel {
            overflow: hidden;
          }
        }
        @media only screen and (max-width: 767px) {
          .modal-open .modal {
            top: 10% !important;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        @media (max-width: 768px) {
          .owlDesign.owl-carousel .owl-controls .owl-nav div {
            opacity: 1;
            visibility: visible;
          }
          .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-prev {
            left: 0px;
          }
          .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-next {
            right: 0px;
          }
        }
        /*! CSS Used from: https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css */
        .pull-right {
          float: right;
        }
      `}</style>
    </div>
  );
};

function Item({ product }) {
  return <ItemUI product={product} />;
  const item = useMemo(() => <ItemUI product={product} />, [product.id]);
  return item;
}
function ItemUI({ product }) {
  const [isOpen, setIsOpen] = useState(true);
  console.log(`/san-pham/${product?.categories[0]?.url || "_"}`);
  return (
    <Box>
      <div className="single-product mb-10">
        <div className="product-img img-full">
          <NextLink
            href={{
              pathname: "/san-pham/[category]/[product]",
              query: {
                category: product?.categories[0]?.url || "_",
                product: product?.url,
              },
            }}
            passHref
          >
            <Link
              title={product.name}
              onMouseEnter={() => {
                setIsOpen(false);
              }}
              onMouseLeave={() => {
                setIsOpen(true);
              }}
            >
              {product.sale ? (
                <span className="onsale">
                  <Field step={5}>
                    {((product.price - product.sale) / product.price) * 100}
                  </Field>
                  %<p>OFF</p>
                </span>
              ) : null}
              {isOpen ? (
                <Image
                  className="visible-xs lazyload"
                  src={

                    (product?.image?.publicUrl || "/assets/img/no-image.png")
                  }
                  blurDataURL={"/assets/img/no-image.png"}
                  placeholder="blur"
                  width={400}
                  height={400}
                  alt={product.name}
                  layout="responsive"
                  objectFit="contain"
                />
              ) : (
                <Image
                  className="pro-img2 hidden-xs"
                  width={400}
                  height={400}
                  src={

                    (product?.images?.length
                      ? product.images[0].file?.publicUrl
                      : product.image?.publicUrl || "/assets/img/no-image.png")
                  }
                  blurDataURL={"/assets/img/no-image.png"}
                  placeholder="blur"
                  alt={product.name}
                  layout="responsive"
                  objectFit="contain"
                />
              )}
            </Link>
          </NextLink>
          {/* <a
              className="product-action btn-quickview-1"
              onClick={() => {
                // onQuickView({ product });
              }}
            >
              <ul>
                <li>XEM NHANH</li>
              </ul>
            </a> */}
        </div>
        <div className="product-content">
          <h3>
            <NextLink
              href={{
                pathname: "/san-pham/[category]/[product]",
                query: {
                  category: product?.categories[0]?.url || "_",
                  product: product?.url,
                },
              }}
              passHref
            >
              <Link
                style={{ textTransform: "capitalize" }}
                title={product.name}
                fontSize="md"
              >
                {product.name}
              </Link>
            </NextLink>
          </h3>
          <div className="product-price">
            {product.sale ? (
              <div className="price-box">
                <span className="price ml5">
                  <Field>{product.price}</Field> ₫
                </span>
                <span className="regular-price">
                  <Field>{product.sale}</Field> ₫
                </span>
              </div>
            ) : (
              <div className="price-box">
                <span className="regular-price">
                  <Field>{product.price}</Field> ₫
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .img-box {
          position: ;
        }
        .sign {
          position: absolute;
          z-index: 1;
          width: 100%;
          left: 0;
        }
        a {
          background-color: transparent;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        img {
          border: 0;
          min-width: 100%;
        }
        @media print {
          *,
          :after,
          :before {
            color: #000 !important;
            text-shadow: none !important;
            background: 0 0 !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
          }
          a,
          a:visited {
            text-decoration: underline;
          }
          a[href]:after {
            content: " (" attr(href) ")";
          }
          a[href^="#"]:after {
            content: "";
          }
          img {
            page-break-inside: avoid;
          }
          img {
            max-width: 100% !important;
          }
          h3,
          p {
            orphans: 3;
            widows: 3;
          }
          h3 {
            page-break-after: avoid;
          }
        }
        * {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        :after,
        :before {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        a {
          color: #337ab7;
          text-decoration: none;
        }
        a:focus,
        a:hover {
          color: #23527c;
          text-decoration: underline;
        }
        a:focus {
          outline: 5px auto -webkit-focus-ring-color;
          outline-offset: -2px;
        }
        img {
          vertical-align: middle;
        }
        h3 {
          font-family: inherit;
          font-weight: 500;
          line-height: 1.1;
          color: inherit;
        }
        h3 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h3 {
          font-size: 24px;
        }
        p {
          margin: 0 0 10px;
        }
        ul {
          margin-top: 0;
          margin-bottom: 10px;
        }

        .fade {
          opacity: 0;
          -webkit-transition: opacity 0.15s linear;
          -o-transition: opacity 0.15s linear;
          transition: opacity 0.15s linear;
        }
        .tab-content > .tab-pane {
          display: none;
        }
        .tab-content > .active {
          display: block;
        }

        .show {
          display: block !important;
        }
        .visible-xs {
          display: none !important;
        }
        @media (max-width: 767px) {
          .visible-xs {
            display: block !important;
          }
        }
        @media (max-width: 767px) {
          .hidden-xs {
            display: none !important;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        .img-full img {
          width: 100%;
        }
        a {
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        a:focus {
          text-decoration: none;
          outline: none;
        }
        a:focus,
        a:hover {
          text-decoration: none;
          color: #86590d;
        }
        a {
          outline: medium none;
          color: #434343;
        }
        h3 {
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h3 a {
          color: inherit;
        }
        h3 {
          font-size: 24px;
        }
        ul {
          margin: 0px;
          padding: 0px;
        }
        p {
          margin-bottom: 15px;
        }
        *::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .mb-10 {
          margin-bottom: 10px;
        }
        .tab-content {
          width: 100%;
        }
        .tab-content .tab-pane {
          display: block;
          height: 0;
          max-width: 100%;
          visibility: hidden;
          overflow: hidden;
          opacity: 0;
          -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        }
        .tab-content .tab-pane.active {
          height: auto;
          visibility: visible;
          opacity: 1;
          -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
          overflow: visible;
        }
        .single-product {
          margin-top: 5px;
        }
        .product-img {
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .onsale {
          background: var(--color-text-danger);
          box-shadow: none;
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
          height: 50px;
          line-height: normal;
          min-height: auto;
          min-width: auto;
          position: absolute;
          left: 0;
          text-align: center;
          top: 0;
          width: 50px;
          z-index: 3;
          border-radius: 0px 10px 10px 10px;

          padding-top: 7px;
        }
        @media (max-width: 625px) {
          .onsale {
            height: 40px;
            font-size: 14px;
            width: 40px;
            padding-top: 3px;
          }
        }
        span.onsale p {
          margin: 0;
        }
        .product-action {
          background: #fff;
          left: 50%;
          position: absolute;
          z-index: 99;
          opacity: 0;
          -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
          visibility: hidden;
          -webkit-transition: all 0.4s ease;
          transition: all 0.4s ease;
          background: rgba(75, 63, 63, 0.5);
          bottom: 0;
          left: 0;
          width: 100%;
          top: auto;
          border: none;
          outline: none;
          text-align: center;
        }
        .product-action > ul > li {
          display: inline-block;
          list-style: none;
          margin: 0 5px 0 0;
          vertical-align: middle;
        }
        .product-content {
          padding: 20px 15px 0px 15px;
          text-align: center;
        }
        .product-content > h3 > a {
          color: #000;
          display: block;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.35;
        }
        .product-content > h3 > a:hover {
          color: #86590d;
        }
        .product-price {
          position: relative;
        }
        .price-box {
          color: #555;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          width: 100%;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }
        .price {
          text-decoration: line-through;
          color: #999;
          font-size: 14px;
          padding-right: 5px;
        }
        .product-content > h3 > a {
          font-weight: bold;
        }
        img {
          max-width: 100%;
        }
        img.pro-img2 {
          position: absolute;
          bottom: 0;
          left: 50%;
          z-index: 1;
          opacity: 0;
          transform: translateX(-50%);
        }
        .img-full img {
          -webkit-transition: all 0.6s ease;
          -moz-transition: all 0.6s ease;
          transition: all 0.6s ease;
        }
        a.product-action.btn-quickview-1 {
          color: #fff;
          padding: 8px 0;
        }
        span.regular-price {
          font-weight: bold;
          color: var(--color-text-danger);
        }
        @media (min-width: 1024px) {
          .single-product:hover img.pro-img2 {
            opacity: 1;
          }
          .single-product:hover img.protmt1 {
            opacity: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .product-content > h3 > a {
            font-weight: bold;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            -webkit-box-pack: center;
            overflow-wrap: break-word;
            overflow: hidden;
          }
          .product-content {
            padding: 10px 0;
          }
        }
        @media (max-width: 767px) {
          .product-content > h3 > a {
            font-size: 14px;
          }
          .product-grid-view .col-md-4:nth-child(odd) {
            padding-right: 7.5px;
          }
        }
        .product-img img {
          width: auto !important;
          margin: auto;
        }
        .ml5 {
          margin-left: 5px;
        }
        ul {
          list-style-position: inside;
        }
        .single-product .product-content h3 {
          margin: 0;
        }
        @media only screen and (min-width: 1200px) {
          .shop-product .product-img img {
            max-height: 100%;
          }
        }
        @media only screen and (min-width: 992px) and (max-width: 1199px) {
          .shop-product .product-img img {
            max-height: 640px;
          }
        }
        @media only screen and (min-width: 768px) and (max-width: 991px) {
          .shop-product .product-img img {
            max-height: 460px;
          }
        }
        @media only screen and (max-width: 767px) {
          .shop-product .product-img img {
            max-height: 190px;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        @media (min-width: 992px) {
          .product-grid-view .col-md-4:nth-child(3n + 1) {
            clear: both;
          }
          .single-product:hover .product-action {
            opacity: 1;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            visibility: visible;
          }
        }
        @media (max-width: 991px) {
          .product-grid-view .col-md-4:nth-child(2n + 1) {
            clear: both;
          }
        }
        @media (max-width: 767px) {
          .hidden-xs {
            display: none !important;
          }
          .col-xs-6 {
            width: 50%;
          }
        }
      `}</style>
    </Box>
  );
}
