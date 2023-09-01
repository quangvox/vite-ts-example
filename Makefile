PWD = $(shell pwd)

MODULE = alice-ui

IMAGE_TAG ?= $(MODULE)
GITHUB_SHA ?= $(MODULE)

ndef = $(if $(value $(1)),,$(error $(1) not set))

dev-up:
	@docker-compose \
		-f docker/dev-docker-compose.yml \
    --env-file ./.env \
		-p $(GITHUB_SHA) up \
		--force-recreate \
		--abort-on-container-exit \
		--exit-code-from app \
		--build

dev-down:
	@docker-compose \
		-f docker/dev-docker-compose.yml \
		-p $(GITHUB_SHA) down \
 		-v --rmi local

preview-up:
	@docker-compose \
		-f docker/docker-compose.yml \
    --env-file ./.env \
		-p $(GITHUB_SHA) up \
		--force-recreate \
		--abort-on-container-exit \
		--exit-code-from app \
		--build

preview-down:
	@docker-compose \
		-f docker/docker-compose.yml \
		-p $(GITHUB_SHA) down \
 		-v --rmi local

test-up:
	@docker-compose \
		-f docker/test-docker-compose.yml \
		-p $(GITHUB_SHA) up \
		--force-recreate \
		--abort-on-container-exit \
		--exit-code-from app \
		--build

test-down:
	@docker-compose \
		-f docker/test-docker-compose.yml \
		-p $(GITHUB_SHA) down \
 		-v --rmi local

.PHONY: dev-up dev-down preview-up preview-down test-up test-down
