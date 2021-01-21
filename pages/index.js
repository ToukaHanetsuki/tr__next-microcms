import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import React from 'react';

const Home = ({news}) => {
  return (
    <div>
      {news.map(item => (
        <React.Fragment key={item.id}>
          <Link href="/news/[id]" as={`news/${item.id}`}>
            <a>{item.title}</a>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.ENDPOINT + '/news', key);

  const data = await res.json();

  return {
    props: {
      news: data.contents,
    },
  };
};

export default Home;
