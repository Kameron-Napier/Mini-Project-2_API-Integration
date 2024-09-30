import express from 'express';
import axios from 'axios';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/joke', async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?name=${firstName},${lastName}`);
    const joke = response.data.joke || `${response.data.setup} ... ${response.data.delivery}`;
    res.render('joke', { joke });
  } catch (error) {
    res.redirect('/error');
  }
});

app.get('/error', (req, res) => {
  res.render('error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
