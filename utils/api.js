import useSWR from 'swr';

const useItems = () => {
  const { data, error } = useSWR('/api/items');

  return [data, !error && !data, error];
};

const useItem = (id) => {
  const { data, error } = useSWR(`/api/item/${id}`);
  return [data, !error && !data, error];
};

export { useItems, useItem };
