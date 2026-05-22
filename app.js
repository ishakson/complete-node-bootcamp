const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  console.log('it done!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`),
);
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    createdAt: req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};
const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: 'updated',
  });
};
const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req,res) =>{
  return res.status(500).json({
    status:"fail",
    message:"not defined"
  })
}

const createUser = (req,res) =>{
  return res.status(500).json({
    status:"fail",
    message:"not defined"
  })
}
const getUser = (req,res) =>{
  return res.status(500).json({
    status:"fail",
    message:"not defined"
  })
}
const updateUser = (req,res) =>{
  return res.status(500).json({
    status:"fail",
    message:"not defined"
  })
}
const deleteUser = (req,res) =>{
  return res.status(500).json({
    status:"fail",
    message:"not defined"
  })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
const port = 3000;
app.listen(port, (req, res) => {
  console.log('server is listening on port 3000!');
});
