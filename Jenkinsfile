pipeline {
    agent any

    // Include Bun in PATH for all stages
    environment {
        PATH = "/var/lib/jenkins/.bun/bin:$PATH"
    }

    stages {

        // Verify Bun & Java
        stage('Verify Tools') {
            steps {
                sh 'which bun'        // Confirm Bun is installed
                sh 'bun --version'    // Check Bun version
                sh 'java -version'    // Confirm Java installation
            }
        }

        Checkout Code
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

        // Frontend - Install Dependencies
        stage('Frontend - Install Dependencies') {
            steps {
                dir('frontend') {       // Switch to frontend folder
                    sh 'bun install'
                }
            }
        }

        // Frontend - Build
        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    sh 'bun run build'
                }
            }
        }

        // Frontend - Deploy with PM2
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

        // Backend - Build Jar
        stage('Backend - Build') {
            steps {
                dir('backend') { 
                    sh '''
                        ./mvnw clean package -DskipTests
                    '''
                }
            }
        }

        //  setup SQLite database
         stage('Setup SQLite DB') {
            steps {
                sh '''
                    mkdir -p db
                    
                    DB_FILE="db/finLoanCalculator.db"
                    if [ ! -f "$DB_FILE" ]; then
                        sqlite3 "$DB_FILE" "VACUUM;"
                    fi

                    chmod 666 "$DB_FILE"
                '''
            }
        }

        stage('Backend - Deploy') {
            steps {
                dir('backend') {
                    sh '''
                        # Stop any existing application
                        pkill -f "java -jar LoanCalculator-1.0.0-SNAPSHOT.jar" || true
                        java -jar target/LoanCalculator-1.0.0-SNAPSHOT.jar &    # Run in background
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
