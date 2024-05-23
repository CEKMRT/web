import { GetServerSideProps } from 'next';

interface Data {
  message: string;
}

interface ServerFetchProps {
  data: Data;
}

export default function ServerFetch({ data }: ServerFetchProps) {
  return (
    <div>
      <h1>Server-Side Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.example.com/data'); // Replace with your actual API endpoint
  const data: Data = await res.json();

  return {
    props: {
      data,
    },
  };
}
