# Requirements:
##### [Docker] (https://docs.docker.com/docker-for-windows/install-windows-home/)

# How to run the app:
     - Go to the `docker-compose` folder within the terminal
     - Create .env file 
     -  Add the following variables
        - PG_USER=postgres
        - PG_PASSWORD=postgres_pw
        - DB_NAME=dbname
     - Execute *docker-compose up --build*  and wait for the app to be up and running
     - Once it is up and running you can access the backend api using `http://localhost:3000/`