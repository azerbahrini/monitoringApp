pipeline {
    environment { 

        registry = "groovyboii/app" 

        registryCredential = 'dockerhub-id' 

        dockerImage = '' 

    }
    

    agent any
    tools {nodejs "NodeJS"}

    stages {
        stage('Clone sources') {
            steps {
                git branch: 'main', url: 'https://github.com/azerbahrini/monitoringApp.git'
            }
        }
        
         stage('Build'){
            steps {
                sh "npm install"
            }
        }
        
        stage('Test-unit'){
            steps {
                 catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS')
                 {
                sh "npm run test-unit"
                 }
            }
        }
        
         stage('Test-integration'){
            steps {
                 catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS')
                {
                sh "npm run test-integration"
                }
            }
        }
    
      stage('SonarQube analysis') {
            environment {
                SCANNER_HOME = tool 'SonarQubeScanner';    
            }
            
            steps {
                    sh "curl 192.168.1.18:9000"
                withSonarQubeEnv('sonarQube') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }
      stage('Building our image') { 

            steps { 

                script { 

                    dockerImage = docker.build registry + ":latest" 

                }

            } 

        } 
      stage('Deploy our image') { 

            steps { 

                script { 

                    docker.withRegistry( '', registryCredential ) { 

                        dockerImage.push() 

                    }
                } 

            }

        }
      stage('Cleaning up') { 

            steps { 

                sh "docker rmi $registry:latest" 

            }

        }  
    }
}	
