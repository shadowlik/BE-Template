const express = require('express');
const router = express.Router();
const config = require('./config');

const {
  ballanceController,
  profileController,
  jobController,
  contractController,
  adminController,
} = require('./controllers');

// Midllewares
const {authMiddleware, clientMiddlware} = require('./middlewares');

// Routes
// TODO: improve routes loading, maybe use nested routes
const routes = [
  {
    path: '/profiles',
    method: 'get',
    controller: profileController.listProfiles,
  },
  {
    path: '/contracts/:id',
    method: 'get',
    controller: contractController.getById,
    auth: true,
  },
  {
    path: '/contracts',
    method: 'get',
    controller: contractController.getContracts,
    auth: true,
  },
  {
    path: '/jobs/unpaid',
    method: 'get',
    controller: jobController.getJobs,
    auth: true,
  },
  {
    path: '/jobs/:job_id/pay',
    method: 'post',
    controller: jobController.payJob,
    auth: true,
  },
  {
    path: '/balances/deposit/:userId',
    method: 'post',
    controller: ballanceController.deposit,
    middlewares: [clientMiddlware],
    auth: true,
  },
  {
    path: '/admin/best-clients',
    method: 'get',
    controller: adminController.bestClients,
  },
  {
    path: '/admin/best-profession',
    method: 'get',
    controller: adminController.bestProfession,
  },
];

// Dynamic load to improve DX
routes.forEach((route) => {
  let middlewares = [];
  if (route.auth) middlewares.push(authMiddleware);
  if (route.middlewares) middlewares = [...middlewares, ...route.middlewares];

  router[route.method](route.path, middlewares, route.controller);
  if (config.log) console.log(`[ROUTE] ${route.method.toUpperCase()}: ${route.path}`);
});

// Error handler TODO: move to another file
router.use((err, req, res, next) => {
  // TODO: Send the error to AWS/GCP to monitor the application
  console.err(err);
  return res.status(500).send('Internal server error');
});

module.exports = router;
