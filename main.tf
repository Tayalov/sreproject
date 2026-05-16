resource "docker_network" "sre_network" {
  name = "sre-network"
}

resource "docker_image" "nginx" {
  name = "nginx:latest"
}

resource "docker_container" "frontend" {
  name  = "frontend"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = var.nginx_port
  }

  networks_advanced {
    name = docker_network.sre_network.name
  }
}