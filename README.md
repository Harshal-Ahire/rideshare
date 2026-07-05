<div align="center">

# 🚗 RideShare — Real-Time Ride Booking System

**A modular Spring Boot backend powering real-time ride matching, live location tracking, and secure trip lifecycle management.**

[![Java](https://img.shields.io/badge/Java-17+-ED8B00?logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-FF6600)](https://en.wikipedia.org/wiki/WebSocket)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[**GitHub**](#) · [**Report Bug**](#) · [**Request Feature**](#)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Capabilities](#key-capabilities)
- [System Architecture](#system-architecture)
- [Core Modules](#core-modules)
- [Real-Time Communication](#real-time-communication)
- [Database Design](#database-design)
- [Security](#security)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

**RideShare** is a backend system modeled on real-world ride-hailing platforms, built to handle the full lifecycle of a ride — from authentication and driver matching to live tracking and fare calculation — with the low latency and reliability that real-time systems demand.

The system is organized into modular Spring Boot services, uses **WebSockets** for live bidirectional communication (driver location, ride status), and relies on a carefully **indexed PostgreSQL schema** to keep ride matching fast even as data volume grows.

---

## Key Capabilities

| Capability | Description |
|---|---|
| 🔐 **Authentication & Authorization** | Secure RESTful APIs with JWT authentication and role-based access control (rider / driver / admin) |
| 🚕 **Ride Lifecycle Management** | End-to-end handling of ride requests, acceptance, in-progress tracking, and completion |
| 🧭 **Driver Matching** | Matching logic to pair riders with nearby available drivers |
| 💰 **Fare Calculation** | Computes trip fares based on ride parameters |
| 📍 **Live Location Updates** | Real-time driver location broadcasting via WebSocket |
| 📡 **Status Synchronization** | Real-time ride acceptance and trip status updates pushed to clients instantly |
| 🗄️ **Low-Latency Matching** | Indexed PostgreSQL schema designed for fast geographic and status-based queries |

---

## System Architecture

```
┌──────────┐     ┌───────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌────────────────┐
│  Client  │ ◀─▶ │  REST API     │ ◀─▶ │  Spring Boot      │ ◀─▶ │  PostgreSQL │     │  WebSocket      │
│ (Rider/  │     │  (JWT auth)   │     │  Service Layer    │     │  (indexed)  │     │  Live Updates   │
│  Driver) │     └───────────────┘     │  (Auth, Rides,    │     └─────────────┘◀───▶└────────────────┘
└──────────┘                           │  Matching, Fare)  │
                                        └──────────────────┘
```

REST endpoints handle stateful operations (auth, ride creation, fare calculation) while a persistent WebSocket connection handles everything that needs to happen in real time — location pings, ride acceptance, and status changes.

---

## Core Modules

The backend is split into clearly bounded Spring Boot service modules:

- **Authentication Service** — user registration, login, JWT issuance, and role-based authorization.
- **Ride Lifecycle Service** — manages ride state transitions (requested → accepted → in-progress → completed) using JPA/Hibernate.
- **Driver Matching Service** — locates and assigns available drivers to incoming ride requests.
- **Fare Calculation Service** — computes trip cost based on ride details.
- **Status Tracking Service** — maintains and broadcasts the current state of each active ride.

Each module is designed to be independently testable and maintainable, with persistence handled through JPA/Hibernate entities.

---

## Real-Time Communication

Live coordination between riders and drivers is handled through **WebSocket** connections rather than polling, enabling:

- **Live driver location updates** streamed to riders during an active trip
- **Instant ride acceptance notifications** the moment a driver accepts a request
- **Trip status synchronization** keeping both rider and driver apps in sync as a ride progresses

This avoids the latency and server load of repeated REST polling and gives the app a genuinely real-time feel.

---

## Database Design

The PostgreSQL schema is **indexed specifically for ride-matching queries** — the most latency-sensitive operation in the system. Entities are modeled and persisted via **JPA/Hibernate**, covering users, drivers, rides, and status/history records, with indexes chosen to keep driver-lookup and ride-matching queries fast as the dataset scales.

---

## Security

- **JWT-based authentication** for all API access
- **Role-based authorization** distinguishing riders, drivers, and administrative access
- RESTful endpoints designed with secure-by-default practices (auth required on all sensitive routes)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java, Spring Boot |
| **Persistence** | PostgreSQL, JPA/Hibernate |
| **Real-Time** | WebSocket |
| **Security** | JWT, Role-Based Access Control |
| **Infrastructure** | Docker |
| **CI/CD** | GitHub Actions |

---

## Getting Started

### Prerequisites
- Java 17+
- Maven
- Docker & Docker Compose
- PostgreSQL (or use the provided Docker service)

### Installation

```bash
git clone https://github.com/<your-username>/rideshare.git
cd rideshare

# Configure environment variables
cp .env.example .env      # DB credentials, JWT secret, etc.

# Run with Docker Compose
docker compose up --build
```

The API will be available at `http://localhost:8080`.

### Run Locally (without Docker)

```bash
mvn clean install
mvn spring-boot:run
```

---

## Project Structure

```
rideshare/
├── src/main/java/com/rideshare/
│   ├── auth/                   # Authentication & JWT
│   ├── ride/                   # Ride lifecycle management
│   ├── matching/                # Driver matching logic
│   ├── fare/                   # Fare calculation
│   ├── websocket/               # Real-time location & status updates
│   └── config/                 # Security & app configuration
├── src/main/resources/
│   └── application.yml
├── docker-compose.yml
├── Dockerfile
├── pom.xml
└── README.md
```

> Update this tree to match your actual repo layout.

---

## Roadmap

- [ ] Ride-sharing / pooled rides
- [ ] Surge pricing model
- [ ] Driver ratings and rider feedback system
- [ ] Admin dashboard for ride monitoring and analytics

---

## License

Distributed under the MIT License. See `LICENSE` for details.

<div align="center">

If you found this project interesting, consider giving it a ⭐

</div>
