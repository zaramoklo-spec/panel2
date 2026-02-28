.PHONY: run build test clean

run:
	go run cmd/server/main.go

build:
	go build -o server cmd/server/main.go

test:
	go test -v ./...

clean:
	rm -f server

install:
	go mod download

migrate-up:
	# Add migration command here

migrate-down:
	# Add migration command here
