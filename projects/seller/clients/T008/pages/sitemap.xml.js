import { gql } from "@apollo/client";
import { Divider } from "@chakra-ui/react";
import { toXML } from "jstoxml";
import options from "@itoa/ui/Translate/options.json";
import {
  executeServerSide,
  getApolloState,
  getVariables,
} from "../ui/UIProvider";

const Sitemap = () => {};

export default Sitemap;

export async function getServerSideProps(context) {
  const {
    query: { category },
    res,
  } = context;

  const result = await executeServerSide(context, [
    {
      query: gql`
        query {
          allPosts {
            id
            url
            createdAt
            updatedAt
            title
            thumbnail {
              publicUrl
            }
            hashtags(first: 1) {
              url
            }
            description
          }
          allProducts {
            id
            name
            price
            sale
            url
            description
            categories(first: 1) {
              url
            }
            brand {
              name
            }
            image {
              publicUrl
            }
            images {
              file {
                publicUrl
              }
            }
            createdAt
            updatedAt
          }
          allProductCategories {
            id
            url
          }
          allPostHashtags {
            id
            url
          }
        }
      `,
    },
  ]);
  const protocol =
    process.env.NODE_ENV === "production" ? "https://" : "http://";
  const { domain } = getVariables(result.props);
  const _d = protocol + domain;
  const data = getApolloState(result.props);
  const {
    ROOT_QUERY: {
      allPosts,
      allProducts,
      allProductCategories,
      allPostHashtags,
    },
  } = data;
  const posts = [];
  const products = [];
  const categories = [];
  const hashtags = [];
  const statics = [];
  options.map(({ value: lang }) => {
    const d = _d + (lang === "vi" ? "" : "/" + lang);
    statics.push({ url: { loc: `${d}/san-pham`, changefreq: "never" } });
    statics.push({ url: { loc: `${d}/bai-viet`, changefreq: "never" } });

    allPosts?.map((post) => {
      //   priorit
      const p = data[post.__ref];
      const [c = {}] = p['hashtags({"first":1})'];
      var url = {
        loc: `${d}/bai-viet/${c.url}/${p.url}`,
        lastmod: p.updatedAt || p.createdAt,
        changefreq: "monthly",
        "news:news": {
          "news:publication": { "news:name": p.title, "news:language": lang },
          "news:publication_date": p.createdAt,
          "news:title": p.description,
        },
      };
      if (p?.thumbnail) {
        url["image:image"] = {
          "image:loc": `${d}/loader?url=${
            p.thumbnail.publicUrl || "/assets/img/no-image.png"
          }`,
          "image:title": p.title,
          "image:caption": p?.description?.slice(0, 80),
          "image:license": `${d}/license/image`,
        };
      }
      posts.push({ url });
    });
    allProducts?.map((product) => {
      //   priorit
      const p = data[product.__ref];
      const [c = {}] = p['categories({"first":1})'];
      var url = {
        loc: `${d}/san-pham/${c.url || "_"}/${p.url}`,
        lastmod: p.updatedAt || p.createdAt,
        changefreq: "daily",
      };
      if (p?.image) {
        url["image:image"] = {
          "image:loc": `${d}/loader?url=${
            p.image.publicUrl || "/assets/img/no-image.png"
          }`,
          "image:title": `${p.name} | ${p.price || p.sale} | ${p?.brand?.name}`,
          "image:caption": `${p.description?.slice(0, 80)}`,
          "image:license": `${d}/license/image`,
        };
      }
      products.push({ url });
    });

    allProductCategories?.map((category) => {
      //   priorit
      const c = data[category.__ref];
      var url = {
        loc: `${d}/san-pham/${c.url || "_"}`,
        changefreq: "monthly",
      };
      categories.push({ url });
    });

    allProductCategories?.map((hashtag) => {
      //   priorit
      const h = data[hashtag.__ref];
      var url = {
        loc: `${d}/bai-viet/${h.url || "_"}`,
        changefreq: "monthly",
      };
      hashtags.push({ url });
    });
  });

  const sitemap = toXML(
    {
      _name: "urlset",
      _attrs: {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
        "xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
      },
      _content: [...statics, ...categories, ...hashtags, ...posts, ...products],
    },
    { header: true, indent: "  " },
  );
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return result;
}
