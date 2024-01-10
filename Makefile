.PHONY: help, dev, build, remove_containers, remove_docker_volumes

help: ## Display available targets and their documentation
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Run the application in the development environment
	@bash run-dev.sh

build: ## Build the development environment
	@docker compose build --parallel

remove_containers:
	@docker rm $$(docker ps -a -q --filter "name=parcel-delivery")

remove_docker_volumes:
	@docker volume rm $$(docker volume ls -qf "label=com.docker.compose.project=parcel-deliver")
