import fetch from 'isomorphic-unfetch';

const Blog = ({blog}) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.description }} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.ENDPOINT + '/news', key);
  const repos = await res.json();

  const paths = repos.contents.map(repo => `/news/${repo.id}`);
  return {paths, fallback: false};
};

export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.ENDPOINT + '/news/' + id, key);
  const blog = await res.json();

  return {
    props: {
      blog: blog,
    },
  };
};

export default Blog;
