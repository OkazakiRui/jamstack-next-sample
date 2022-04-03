import Link from 'next/link';
import { VFC } from 'react';

type Props = {
  totalCount: number;
  dir?: string;
};

const Pagination: VFC<Props> = ({ totalCount, dir }) => {
  const perPage = 5;
  const range = (start: number, end: number): number[] =>
    [...Array(3)].map((_, i) => start + i);

  return (
    <ul style={{ display: 'flex', listStyle: 'none', gap: '4px' }}>
      {range(1, Math.ceil(totalCount / perPage)).map((number, index) => (
        <li key={index}>
          <Link href={`${dir || '/page'}/${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
