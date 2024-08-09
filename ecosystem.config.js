module.exports = {
    apps: [
      {
        name: 'vendure-server',
        script: 'npm',
        args: 'run start:server',
        env: {
          NODE_ENV: 'production',
        },
        autorestart: true
      },
      {
        name: 'vendure-worker',
        script: 'npm',
        args: 'run start:worker',
        env: {
          NODE_ENV: 'production',
        },
        autorestart: true
      },
    ],
  };