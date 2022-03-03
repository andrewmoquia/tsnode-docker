FROM node:17 as base

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .

FROM base as production

RUN npm run build




# Build our docker image
# docker-compose build

# Run the container
# docker-compose up -d

# Stop the container
# docker-compose down

# Start our container in production
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d   

#################################################################################

# docker build .
# docker image ls
# docker image rm image_id
# docker build -t node-app-image . 

# --name node app   = name of the container we creating.
# node-app-image    = name of the image. 
# -d                = run in development
# docker run -d --name node-app node-app-image

# see files inside our docker image
# docker exec -it node-app bash
# ls = list files
# printenv = see env

# sync local folder to folder in docker container
# avoid rebuild the image
# 

# See open container.
# docker ps
