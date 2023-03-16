/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import sanityClient from "../../utils/client";
import { urlFor } from "../../utils/image";
import { PortableText } from "@portabletext/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import { format } from "date-fns";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
  height: 100vh;
  position: absolute;
  right: 0;
  z-index: 1200;
  // background: green;
`;

const PostHero = styled.div`
  width: 100%;
  display: flex;
  background: teal;
  border-bottom: 1px solid maroon;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const PostHeroContent = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 50px;
  color: #000;
  text-transform: capitalize;
  ul {
    list-style: none;
  }

  @media only screen and (max-width: 600px) {
    margin-left: 20px;
    padding-left: 20px;
  }
`;

const IconWrapper = styled.div`
  font-size: 25px;
  padding: 15px;
  margin-top: 70px;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    padding: 0px;
    margin-top: 20px;
  }
`;

const PostTitle = styled.h3`
  margin: 5px 0;
  font-size: 20px;
`;

const ImgWrapper = styled.div`
  grid-area: mainImg;
  margin: 50px 100px;
  // border: 1px solid #000;
  height: 70vh;
  @media only screen and (max-width: 1024px) {
    height: 100%;
    margin: 20px 30px;
  }
`;

const TextWrapper = styled.div`
  opacity: 0.8;
  display: flex;
  justify-content: flex-end;
`;

const TextContainer = styled.div`
  width: 70%;
  padding: 15px 135px 0 0;
  @media only screen and (max-width: 1024px) {
    // padding: 40px 0px 20px;
    padding: 10px 30px;
    width: 100%;
  }
`;

const post = ({ title, publishedDate, image, body }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Wrapper>
          <PostHero>
            <PostHeroContent>
              <ul>
                <li>
                  <IconWrapper>
                    <Link href="/">
                      <AiOutlineArrowLeft />
                    </Link>
                  </IconWrapper>
                </li>
                <li>
                  <PostTitle>{title}</PostTitle>
                </li>
                <li>{publishedDate}</li>
              </ul>
            </PostHeroContent>
            <ImgWrapper>
              <img
                src={urlFor(image)}
                alt=""
                className="img"
                width="100%"
                height="100%"
              />
            </ImgWrapper>
          </PostHero>
          <TextWrapper>
            <TextContainer>
              <PortableText value={body} />
            </TextContainer>
          </TextWrapper>
          {/* <footer>blog footer</footer> */}
        </Wrapper>
      </motion.div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[_type == "posts" && slug.current == $pageSlug][0] {
  title,
  publishedDate,
  image,
  body,
}`;

  const post = await sanityClient.fetch(query, { pageSlug });
  if (!post) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: post.title,
        publishedDate: post.publishedDate,
        image: post.image,
        body: post.body,
      },
    };
  }
};

export default post;
