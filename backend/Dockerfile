# Use a more reliable OpenJDK image
FROM openjdk:17-jdk

WORKDIR /app

# Copy Maven wrapper and pom
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Give permission to mvnw
RUN chmod +x ./mvnw

# Download dependencies first (better caching)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the app
EXPOSE 8080
CMD ["java", "-jar", "target/rideshare-0.0.1-SNAPSHOT.jar"]
