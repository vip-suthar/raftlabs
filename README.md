# Raftlabs Task

This is Nodejs, mongodb, express and socket-io app which contains both the tasks

## Setup and Run Locally with or without using Docker

Commands

```bash
    # clone github repo
    $ git clone https://github.com/vip-suthar/raftlabs.git
    $ cd raftlabs
    $ cp .env.example .env

    # Run without using docker
    $ npm install
    $ npm run dev

    # Run with docker
    # start containers
    $ docker-compose up -d
    # stop containers
    $ docker-compose down

    # check logs of docker image
    $ docker logs <CONTAINER_ID>

    # Run tests
    $ npm run test
```

## Directory Structure

```
.
├── dist/                                # Build files
├── postman/                             # Postman documentation
├── src/                                 # All code
│   ├── config/                          # Contains all the configurations
│   ├── models/                          # Contains all the database schema and models
│   ├── services/                        # Contains all the services
│   ├── controllers/                     # Contains all the controllers
│   ├── middlewares/                     # Contains all the middlewares
│   ├── validators/                      # Contains all the request validators
│   ├── serializers/                     # Contains all the serializers
│   ├── utils/                           # Contains all the utility
│   ├── websocket/                       # Contains websocket and its related files
│   └── routes/                          # Contains all the routes
├── tests/                               # Contains all the test files
├── tsconfig.json                        # Typescript Config
├── index.ts                             # Index file
├── package.json
├── package-lock.json
└── README.md
```

## API Reference

Postman Docs are placed in `Postman` folder

### Get Home URL

```http://localhost:8000/api/```
