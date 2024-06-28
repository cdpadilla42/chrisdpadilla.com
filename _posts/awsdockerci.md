---
title: Configuring a CI/CD Pipeline in CircleCI to Deploy a Docker Image to AWS ECS
tags:
  - Tech
  - CI
  - Docker
  - AWS
date: '2024-06-28T10:35:07.322Z'
---

Continuous Integration/Continuous Deployment has many benefits in a team's development process! Much of the manual work of pushing changes to production are automated, different processes can be created between staging and production environments, and setting up a CI/CD flow can be a way of practicing Infrastructure As Code. The benefits to having the deployment process documented are all the same as using git in your application code: it's clearly documented, changes can be reverted, and there's a single source of truth for the process. 

Here I'll be continuing on from [deploying a Docker Image to AWS](/deploydockertoaws)! This time, looking at integrating the process into a CI/CD process. Namely: [CircleCI](https://circleci.com/)!

## Setup

To configure CircleCI, we'll add this file as `.circleci/config.yml` from the root of our application:

```yml
version: 2.1
orbs:
  aws-cli: circleci/aws-cli@4.0
  aws-ecr: circleci/aws-ecr@9.1.0
  aws-ecs: circleci/aws-ecs@4.0.0
```

Here I'm loading in all the necessary orbs that will support our deployment. Orbs can be thought of as a group of pre-defined jobs that support integrations. Let's continue setting things up and seeing these orbs in action:

## Checkout Repo

Much of the heavy lifting here will be done by the orbs we're pulling in. The only custom job we'll need to employ is one for checking out our repo on github:

```yml
jobs:
  checkout-repo:
    docker:
      - image: cimg/node:20.14
    steps:
      - checkout
```

## Stepping Through the Workflow

Below the jobs block, it's now time for us to setup our workflow! This is the access point where CircleCI will call our commands and run our jobs.

I'm going to start by naming the workflow `build-app`. Under jobs, I'll start with the `checkout-repo` flow we just created:

```yml
workflows:
  build-app:
    jobs:
      - checkout-repo:
          name: checkout-repo
          filters:
            branches:
              only:
                - main
```

Here, I'm also targeting which branch triggers a build. Anytime a PR is merged into `main`, the process will fire off.

Next, let's build our docker image. We're going to be configuring the `aws-ecr/build_and_push_image` job:


```yml
  - aws-ecr/build_and_push_image:
	  requires:
	    - checkout-repo
	  account_id: ${ID}
	  auth:
	    - aws-cli/setup:
	        role_arn: ${ROLE}
	        role_session_name: CircleCISession
	  dockerfile: Dockerfile
	  repo: ${REPO}
	  tag: ${CIRCLE_SHA1}
	  extra_build_args: >-
	    --build-arg API_KEY=${API_KEY}
```

Most of these will be self explanatory if you've deployed to ECR before. One thing worth noting specific to CircleCI is the `requires` block. Here, we're adding `checkout-repo` as a dependency. I want the job to run sequentially, so here I'm telling CircleCI to wait for the previous step to complete before starting this one.

Also note that I'm passing in `CIRCLE_SHA1` to the tag. I'm tagging images here with the unique hashed identifier. This way, all of my images are uniquely identified in ECR. The `CIRCLE_SHA1` variable comes for free in any workflow.

Finally, we'll deploy to our ECS service by updating the service:

```yml
  - aws-ecs/deploy_service_update:
      requires:
        - aws-ecr/build_and_push_image
      cluster: ${CLUSTER}
      family: ${FAMILY}
      service_name: ${SERVICE}
      container_image_name_updates: container=${CONTAINER}, tag=${CIRCLE_SHA1}
      force_new_deployment: true
      auth:
        - aws-cli/setup:
            role_arn: ${ROLE}
            role_session_name: CircleCISession
```

Again, much should be familiar from the CLI approach. What's worth highlighting is the `container_image_name_updates` property. Since I'm defining the hashed id as the tag name in the previous job, I'm going to update my container image through the arguments `container=${CONTAINER}, tag=${CIRCLE_SHA1}`

The `force_new_deployment` argument is required for new changes to be pushed if the task is already running on ECS. (Which it likely is since this is _continuous_ deployment!)

## Full Config

That's it! That's enough to get the app spun up and running. Here's the full config for context:


```yml
version: 2.1
orbs:
  aws-cli: circleci/aws-cli@4.0
  aws-ecr: circleci/aws-ecr@9.1.0
  aws-ecs: circleci/aws-ecs@4.0.0

jobs:
  checkout-repo:
    docker:
      - image: cimg/node:20.14
    steps:
      - checkout

workflows:
  build-app:
    jobs:
      - checkout-repo:
          name: checkout-repo
          filters:
            branches:
              only:
                - main
      - aws-ecr/build_and_push_image:
          requires:
            - checkout-repo
          account_id: ${ID}
          auth:
            - aws-cli/setup:
                role_arn: ${ROLE}
                role_session_name: CircleCISession
          dockerfile: Dockerfile
          repo: ${REPO}
          tag: ${CIRCLE_SHA1}
          extra_build_args: >-
            --build-arg API_KEY=${API_KEY}
      - aws-ecs/deploy_service_update:
          requires:
            - aws-ecr/build_and_push_image
          cluster: ${CLUSTER}
          family: ${FAMILY}
          service_name: ${SERVICE}
          container_image_name_updates: container=${CONTAINER}, tag=${CIRCLE_SHA1}
          force_new_deployment: true
          auth:
            - aws-cli/setup:
                role_arn: ${ROLE}
                role_session_name: CircleCISession
```