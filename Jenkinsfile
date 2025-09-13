pipeline {
    agent any

    // Include Bun in PATH for all stages
    environment {
        PATH = "/var/lib/jenkins/.bun/bin:$PATH"
    }

    stages {

        // -------------------------------
        // Stage 1: Verify Bun & Java
        // -------------------------------
        stage('Verify Tools') {
            steps {
                sh 'which bun'        // Confirm Bun is installed
                sh 'bun --version'    // Check Bun version
                sh 'java -version'    // Confirm Java installation
            }
        }

        // -------------------------------
        // Stage 2: Checkout Code
        // -------------------------------
        stage('Checkout Code') {
            steps {
                // Using Git credentials stored in Jenkins
                withCredentials([usernamePassword(credentialsId: 'muiru-secret', 
                                                 usernameVariable: 'GITHUB_USERNAME', 
                                                 passwordVariable: 'GITHUB_TOKEN')]) {
                    git url: "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/chris-muiru/fin-affordability-calculator.git", 
                        branch: 'main'
                }
            }
        }

        // -------------------------------
        // Stage 3: Frontend - Install Dependencies
        // -------------------------------
        stage('Frontend - Install Dependencies') {
            steps {
                dir('frontend') {       // Switch to frontend folder
                    sh 'bun install'
                }
            }
        }

        // -------------------------------
        // Stage 4: Frontend - Build
        // -------------------------------
        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    sh 'bun run build'
                }
            }
        }

        // -------------------------------
        // Stage 5: Frontend - Deploy with PM2
        // -------------------------------
        stage('Frontend - Deploy') {
            steps {
                dir('frontend') {
                    sh '''
                        pm2 stop fin-calculator || true    # Stop if running
                        pm2 start ecosystem.config.js      # Start app with PM2
                        pm2 save                           # Save PM2 process list
                    '''
                }
            }
        }

        // -------------------------------
        // Stage 6: Backend - Build Jar
        // -------------------------------
        stage('Backend - Build') {
            steps {
                dir('backend') {                  // Switch to backend folder
                    sh './mvnw clean package -DskipTests'  // Build Spring Boot jar
                }
            }
        }

        // -------------------------------
        // Stage 7: Backend - Run Jar
        // -------------------------------
        stage('Backend - Deploy') {
            steps {
                dir('backend') {
                    sh '''
                        # Stop any existing app (optional, you can use systemd if preferred)
                        pkill -f "java -jar backend.jar" || true
                        java -jar target/backend.jar &    # Run in background
                    '''
                }
            }
        }
    }

    // -------------------------------
    // Post-build actions
    // -------------------------------
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
