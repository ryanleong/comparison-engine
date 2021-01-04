import itemsList from 'config/stroller/items.json';

const { items } = itemsList;

export default (req, res) => {
  if (req.method === 'GET') {
    const { id: itemId } = req.query;

    const item = items.find(({ id }) => id === parseInt(itemId, 10));

    if (item) {
      res.statusCode = 200;
      res.json(item);
      return;
    }

    res.statusCode = 200;
  }

  res.statusCode = 404;
  res.end();
};
