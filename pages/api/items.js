import itemsList from 'config/stroller/items.json';

const items = itemsList.items.map((item) => {
  // eslint-disable-next-line no-unused-vars
  const { specs, ...rest } = item;
  return rest;
});

export default (req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.json({
      items,
      count: items.length,
    });

    return;
  }

  res.statusCode = 404;
  res.end();
};
