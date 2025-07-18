# 🛠️ Root-level Makefile for monorepo

.PHONY: setup dev build lint format test clean scaffold

setup:
	pnpm install

dev:
	pnpm run dev

build:
	pnpm run build

lint:
	pnpm run lint

format:
	pnpm run format

test:
	pnpm run test

clean:
	rm -rf node_modules .turbo dist build

scaffold:
	pnpm run scaffold
