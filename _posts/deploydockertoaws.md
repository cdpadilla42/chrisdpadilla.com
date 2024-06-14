---
title: Deploying a Docker Image to AWS Elastic Container Service
tags:
  - Tech
  - AWS
  - Docker
date: '2024-06-14T10:35:07.322Z'
---

There are great benefits to be had when bundling an application in a Docker Image. Namely, maintaining control over the environment, including runtime versions, package managers, and environment variables. From a development standpoint, developing with docker can ensure all those same benefits on your local machine, instilling confidence that there won't be any unforeseen errors due to a difference in build environment.

So! Today I'll dive into how you can take your docker image and throw it up on AWS for deployment.

## Services

We'll be looking at using two services: Elastic Container Services (ECR) and Elastic Container Registry (ECR)

**ECS** is the platform which will actually enable us to setup the hosting environment for our application. When configured with AWS **Fargate**, much of the nitty gritty of instantiating separate services is taken care of. 

**ECR** is the AWS proprietary image repository for hosting your docker image on build. ECS will reference our specified repo to find the image to build our app from. ECR stores images based on versions, or **tags** as they're called. You can set a tag by version number or any other unique identifier, and then rollback if you ever need to.

## Setting Up the AWS Services

To setup ECR and ECS, I'll recommend logging into to the AWS console and setting up your repo in ECR and creating a Service and Task in ECS. The sensible defaults should be ok with getting you started. [Official AWS tutorials](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_AWSCLI_Fargate.html) may be helpful to reference as you do so.

To keep this post brief, I'll be focusing on the CLI deployment.

## Deploying to ECR

Assuming we have a working Dockerfile and application, here's how we can get started.

We'll start with building the image locally. This can later be automated in a CI/CD process. For now, though, we'll do it through the command line:

```bash
$ docker build --no-cache -f myapp.Dockerfile -t <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com/<ECR_REPO_NAME>:<TAG> .
```

Be sure to run this from your project directory, or change the `.` to refer to the root of your project.

Biggest thing to note here is that we're tagging our image with the `-t` flag. The tag we are giving it should match with all of the AWS specific variables provided above.

Once that's done, we'll log in and retrieve AWS permissions to push our image in the following step:

```bash
$ aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com
```
Be sure that you have in your env variables the appropriate AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY. Those will override any variables set in your aws command line profiles.

From there, we're set to push the image!

```bash
$ docker push <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com/<ECR_REPO_NAME>:<TAG>
```

## Running Your ECS Task

You can run your task from the AWS portal, though while we're here, we may as well fire it up from the command line!

```bash
$ aws ecs run-task \
  --cluster <CLUSTER_NAME> \
  --launch-type FARGATE \
  --task-definition <TASK_DEF> \
  --network-configuration "awsvpcConfiguration={subnets=[<subnet-id>],securityGroups=[<security-group-id>],assignPublicIp=ENABLED}"
```

Swapping all of your appropriate variables here will enable you to spin up the application, now deploying to a subnet of your choice and soon running on AWS!
