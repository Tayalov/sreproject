# SRE ENDTERM Project (Microservices System)

This project demonstrates the implementation of a microservices-based system using Site Reliability Engineering (SRE) principles. The goal was to build a system that is scalable, reliable, and resilient to failures.

---

# Project Overview

The system consists of multiple independent microservices:

- Auth Service  
- User Service  
- Product Service  
- Order Service  
- Payment Service  
- Notification Service  

Each service runs independently and communicates through APIs.

---

# System Architecture

User requests follow this flow:


User
|
Frontend (Nginx)
|
API Gateway
|
Microservices
|
PostgreSQL / Redis


The system also includes supporting infrastructure components:

- Prometheus for metrics collection
- Grafana for visualization
- Terraform for infrastructure provisioning
- Ansible for configuration management
- Docker Swarm and Kubernetes for orchestration

---

# Docker

All microservices are containerized using Docker.  
Docker Compose and Docker Swarm are used for local deployment and service orchestration.

---

# Kubernetes

Some services are deployed using Kubernetes to demonstrate advanced orchestration features.

Commands used:

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get services

Kubernetes provides self-healing, scaling, and declarative deployment capabilities.

Monitoring

The monitoring system is built using Prometheus and Grafana.

It tracks the following metrics:

CPU usage
Memory usage
Request rate
Error rate
Service availability
Terraform

Terraform is used to implement Infrastructure as Code (IaC).
It ensures reproducible and automated infrastructure provisioning.

Commands used:

terraform init
terraform apply -auto-approve
Ansible

Ansible is used for automation and configuration management.

It is responsible for:

Installing dependencies
Configuring environments
Deploying services
Setting up monitoring tools
Incident Simulation

An incident was simulated by stopping the PostgreSQL database service.

Impact:

Order service stopped functioning
System experienced partial failure

Detection:

Prometheus detected service downtime
Grafana dashboards showed service degradation

Recovery:

Database service was restarted
System returned to normal state

This demonstrated system observability and resilience.

Key Features
Microservices architecture
Containerization with Docker
Multi-orchestration (Kubernetes and Docker Swarm)
Infrastructure as Code using Terraform
Configuration management using Ansible
Monitoring and observability with Prometheus and Grafana
Incident simulation and recovery
Project Structure
finalweb/
├── auth-service/
├── user-service/
├── product-service/
├── order-service/
├── payment-service/
├── notification-service/
├── k8s/
├── terraform/
├── ansible/
├── monitoring/
├── docker-compose.yml
└── README.md
Conclusion

This project demonstrates a complete SRE workflow including development, deployment, monitoring, automation, and incident response. The system is designed to be scalable, observable, and resilient to failures.


