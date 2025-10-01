module.exports = {
	apps: [
		{
			name: "fin-loan-calculator",
			exec_mode: "cluster", // run in cluster mode
			instances: "1",
			script: "node_modules/next/dist/bin/next",
			args: "start",
			env: {
				NODE_ENV: "production",
				HOST: "0.0.0.0", // listen to all network interfaces
				PORT: 7767,
			},
		},
	],
}
