const cors = require('cors');
const express = require('express');
const stopsStreetGoodData = require('.');

const mockApi = express();
mockApi.listen(3000);

mockApi.use(cors());
mockApi.get(stopsStreetGoodData.endpoint, (req, res) => {
  res.json(stopsStreetGoodData.mockData);
});
console.log('Running mock server.')
