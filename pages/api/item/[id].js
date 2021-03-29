import { getItem } from 'utils/firebase';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { id: itemId } = req.query;
    const item = await getItem(itemId);

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
