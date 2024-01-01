
// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const parserRoutes = require('./routes/parser/parser-routes');
const imageFilesRoutes = require('./routes/import-images/image-files-routes');
const createDatabaseRoutes = require('./routes/create-database/create-database-routes');
const insertBricksRoutes = require('./routes/insert-bricks/insert-bricks-routes');
const bricksRoutes = require('./routes/bricks/bricks-routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/parser', parserRoutes);
app.use('/image-files', imageFilesRoutes);
app.use('/create-database', createDatabaseRoutes);
app.use('/insert-bricks', insertBricksRoutes);
app.use('/bricks', bricksRoutes);

app.listen(5000, (err) => {
  console.log('Listening');
});
