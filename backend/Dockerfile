# Dockerfile for Spring Boot Backend
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven files
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the app
CMD ["java", "-jar", "target/rideshare-0.0.1-SNAPSHOT.jar"]
