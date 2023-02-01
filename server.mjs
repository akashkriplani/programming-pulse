import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to db.'))
  .catch(() => console.log('Error in connecting to db.'));

const User = mongoose.model(
  'users',
  new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    phone: String,
    website: String
  })
);

const Post = mongoose.model(
  'posts',
  new mongoose.Schema(
    {
      id: Number,
      title: String,
      body: String,
      userId: Number
    },
    { timestamps: true }
  )
);

app.get('/api/users', async (req, res) => {
  const { email, password } = req.query;
  const users = await User.find(email && password ? { email, password } : {});
  res.send(users);
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.query;
  const user = await User.findOne({ id });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.post('/api/users', async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.send({ message: 'Data is required. ' });
  }
  const user = new User(req.body);
  const createdUser = await user.save();
  res.send(createdUser);
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name, phone, password, website } = req.body;
  const user = await User.findOne({ id });
  if (user) {
    user.email = email;
    user.name = name;
    user.phone = phone;
    user.password = password;
    user.website = website;
    const updatedUser = await user.save();
    res.send(updatedUser);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.get('/api/seed', async (req, res) => {
  await User.deleteMany();
  await User.insertMany([
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      password: '123',
      phone: '1-770-736-8031 x56442',
      website: 'https://mywebsite.com'
    }
  ]);

  await Post.deleteMany();
  await Post.insertMany([
    {
      id: 1,
      title: 'Hello world',
      body: 'Welcome to my blog',
      userId: 1
    }
  ]);

  res.send({ message: 'Seeded successfully!' });
});

app.get('/api/posts', async (req, res) => {
  const { userId } = req.query;
  const posts = await Post.find(userId ? { userId } : {});
  res.send(posts);
});

app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.query;
  const post = await Post.findOne({ id });
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.post('/api/posts', async (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.send({ message: 'Data is required. ' });
  }
  const post = new Post(req.body);
  const createdPost = await post.save();
  res.send(createdPost);
});

// Add code for heroku deployment
const dirname = path.resolve();
app.use('/', express.static(dirname + '/build'));
app.get('/', (req, res) => {
  res.sendFile(dirname + '/build/index.html');
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Served at http://localhost:5001'));
