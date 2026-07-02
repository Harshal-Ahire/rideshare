# Use Eclipse Temurin (reliable OpenJDK distribution)
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy Maven wrapper and pom
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Give execute permission
RUN chmod +x ./mvnw

# Download dependencies (caching)
RUN ./mvnw dependency:go-offline -B

# Copy source
COPY src ./src

# Build
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "target/rideshare-0.0.1-SNAPSHOT.jar"]
