import Head from "next/head";
import React from "react";

type props = {
  title?: string;
  keywords?: string;
  description?: string;
};

function Meta({ title, keywords, description }: props) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords ? keywords : "trivia"} />
      <meta
        name="description"
        content={description ? description : "Trivia game for web developers"}
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title ? title : "Trivial Roulette"}</title>
    </Head>
  );
}

export default Meta;
