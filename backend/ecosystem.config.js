module.exports = {
	apps: [
		{
			name: "fin-backend",
			script: "java",
			args: "-jar target/LoanCalculator-1.0.0-SNAPSHOT.jar",
			env: {
				NODE_ENV: "production",
				HOST: "0.0.0.0",
				PORT: 7767,
			},
		},
	],
}
