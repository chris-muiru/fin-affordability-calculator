pipeline {
    agent any

    // Add the environment block to include Bun in the PATH
    environment {
        PATH = "/var/lib/jenkins/.bun/bin:$PATH"
    }

    stages {

        // Verify that Bun is installed and available
        stage('Verify Bun,Java installation) {
            steps {
                sh 'which bun'        // Check Bun's location
                sh 'bun --version'    // Display Bun version
            }
        }

        // Checkout your code from GitHub
        stage('Checkout') {
            steps {
                // Use your GitHub credentials stored in Jenkins
                withCredentials([usernamePassword(credentialsId: 'muiru-secret', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                    git url: "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/chris-muiru/new-ui-muiru-ecomm.git", branch: 'main'
                }
            }
        }

        // Install dependencies using Bun
        stage('Install Dependencies') {
            steps {
                sh 'bun install'    
            }
        }

        // Build the Next.js project using Bun
        stage('Build') {
            steps {
                sh 'bun run build'   
            }
        }

        // start application
        stage('start application'){
           steps {
                script {
                    sh '''
                        pm2 stop fin-calculator || true  # Stop the application if it's running
                        pm2 start ecosystem.config.js || true  # Start the app
                        pm2 save  # Save the process list to PM2
                        '''
                }
            }
        }
    }

    // Post-build actions
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
