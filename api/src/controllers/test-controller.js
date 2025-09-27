module.exports = testController = {
  get: (req, res) => {
    res.json({ message: 'Hello from the test controller!' });
  },
};
