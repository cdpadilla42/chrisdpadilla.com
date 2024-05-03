---
title: Deploying Docker Compose Application to AWS EC2
tags:
  - Tech
  - AWS
  - Docker
  - Spring Boot
  - Java
date: '2024-05-03T10:35:07.322Z'
---

Many deployment platforms (Vercel, Heroku, Render) add a great amount of magic and convenience to the process of publishing a web app. But is it all that difficult to work without some of the tooling? 

I wanted to find out. So this week I put on my DevOps hat and decided to get my hands dirty!

My aim was to take an app I had built, wrap it up along with a database into a docker container, and deploy to AWS. All without extra bells and whistles — No Fargate, no Elastic Beanstalk, no CI/CD integration just yet. Just a simple Linux server on EC2!

In this case, it's a Java Spring Boot app with a PostgreSQL db. Though, since it's wrapped up in docker compose, this post will apply to any containerized app.

Here we go!

## Local Setup

### Write the Dockerfile

Assuming I already have my app built, we'll write the docker file for it. I'm going to store it under `src/main/docker` for organization. We'll also keep it pretty simple for the application:

```
FROM openjdk:17-oracle
COPY . /app
ENTRYPOINT ["java", "-jar", "app/app.jar"]
``` 

All that's happening here is I'm using the Java image for the version I'll build with. Then I'll copy the contents into the container. And lastly, I'll kick off the program with `java -jar app/app.jar`

### Build the Executable

If you're not running Spring Boot, feel free to skip ahead! Here's how I'm setting up my executable:

To build my app, I'm going to run `mvn clean package`. This will generate a jar file in my target folder. From there, I'll simply move it over to the docker directory with the linux command:

```
cp target/demo-0.0.1-SNAPSHOT.jar src/main/docker/app.jar
```

### Write the Docker Compose Config

Next is the docker compose file. This is where I'm bringing in the PostgreSQL db and wrapping it up with my app. Here's the file:

```
services:
  app:
    container_name: spring-boot-postgresql
    image: 'docker-spring-boot-postgres:latest'
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - db
    environment:
      - SPRING_DATASOURC_URL=jdbc:postgresql://db:5432/compose-postgres
      - SPRING_DATASOURCE_USERNAME=compose-postgres
      - SPRING_DATASOURCE_PASSWORD=compose-postgres
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update
    
  db:
    image: 'postgres:13.1-alpine'
    container_name: db
    environment:
    - POSTGRES_USER=compose-postgres
    - POSTGRES_PASSWORD=compose-postgres
```

`app` and `db` are the individual images here for my container. For each, I'm pulling the relevant dependency images for Spring and PostgreSQL respectively. Under `app.build` We're setting the context to be the current director (`src/main/docker`) and pulling the docker file from there. 

A few areas specific to my setup:
- Spring Boot runs on port `8080` by default. In my configuration `application.properties`, I've set the port to `80`. This is the default HTTP port and makes it so that, on the EC2 server, I'll be able to access the app. Otherwise, instead of "myapp.com", I would have to access "myapp.com:8080". To match both within and without the container, I'm setting the port config.
- I'm setting my environment variables on both. The default port for PostgreSQL is `5432`, so that's where the db url points to.
- Hibernate is an ORM for Java objects to SQL/relational databases. Here I'm specifying that Hibernate should update the SQL schema based on my applications model configuration.

## AWS Setup

At this point, I'll point you to the [AWS docs for setting up an EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html). Here's the gist:

- Ensure you have a [VPC](/awsvpc) created. The default is fine if you have it.
- Instantiate your EC2, configured to Linux.
- Generate your key pair
- Edit the security group to allow inbound HTTP requests

Once your EC2 is up, it's time to SSH into it!

### SSH and Installs

From your local machine, grab your key pair as well as the public DNS addres. (You can find instructions on the instance page after clicking "connect")

```
ssh -i /main-keypair.pem  ec2-user@ec2-34-75-385-24.compute-1.amazonaws.com
```

The most magical part to me: after that, you'll be logged in and accessing the Linux terminal on your server!!

Since it's simply a Linux server, we can install all the dependencies we need just as if we were doing it on our own machine.

From here, install:

- Docker
- Docker Compose
- Git
- Maven (or whichever build tool you are using)

After that, here's how we'll get the code onto our server:

- Add the current user to docker:
	```
	sudo usermod -aG docker $USER
	sudo reboot
	```
- Clone your git repo to the server (prereq: Upload your project to GitHub!)
	```
	git clone ssh://john@example.com/path/to/my-project.git 
	```
- Build the application locally
	```
	mvn package
	```
	- We'll have to move the jar file to the docker directory once again.
- Navigate to the docker directory. 
	```
	cd src/main/docker
	```
- Build the docker image
	```
	docker-compose -f docker-compose.yml build
	```
- Run the container with `docker-compose up` or `docker-compose up -d` to run in the background and keep it running after you exit the server.

After that, accessing the public DNS address should show your app up and running!

## Automation

Now the app is up! _However_, what if we need to make changes to the app? It's not a back-breaking process, but it would involve a few steps: 

- Git push changes
- SSH back into the server
- Clone the repo
- Rebuild the executable
- Rebuild the docker image
- Rerun the docker container

Something that is certainly doable in a few minutes. But it screams for automation, doesn't it?

The next step for me would be to embrace that automation. Knowing the steps individually for deploying an app to a Linux server, I would be taking a look at tools such as GitHub Actions or CircleCI to automate much of this process.

Then, of course, there are many more considerations for a real world app. Performance monitoring, error logging, automatic scaling, load balancing — just to name a few!

It was great to take a deep dive on deployment in isolation! On to exploring further tooling to support that process. 