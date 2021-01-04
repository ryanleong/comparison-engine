import config from 'config/stroller/config.json';

export default (req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.json({ ...config });
    return;
  }

  res.statusCode = 404;
  res.end();
};
