import useSWR from 'swr';

const useItems = () => {
  const { data, error } = useSWR('/api/items');

  return [data, !error && !data, error];
};

const useItem = (id, options = {}) => {
  const { data, error } = useSWR(`/api/item/${id}`, options);
  return [data, !error && !data, error];
};

export { useItems, useItem };
