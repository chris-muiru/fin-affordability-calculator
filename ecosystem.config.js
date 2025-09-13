module.exports = {
  apps: [
    {
      name: 'fin-loan-calculator',
      exec_mode: 'cluster',
      instances: '1',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 7767,
      },
    },
  ],
}
