const express = require('express');
const { exec } = require('child_process');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/run-python-script', (req, res) => {
  const inputParam = req.query.input_param || '';
  const command = `python ./get_build_history.py ${inputParam}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running Python script: ${error}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(`Python script output: ${stdout}`);
    res.send(stdout);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
