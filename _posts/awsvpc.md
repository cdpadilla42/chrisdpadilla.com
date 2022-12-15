---
title: Amazon Virtual Private Clouds
tags:
  - Tech
  - AWS
date: '2022-12-15T05:35:07.322Z'
---

I'm continuing research on cloud architecture this week. Here are some notes on Virtual Private Clouds (VPC). In these notes, I'll be covering what they are, why use them, and what are the parts that make up a VPC.

# VPC Overview

A VPC is a private sub-section of AWS that you control, where you can place your resources (EC2's, S3s, Databases). You have full control over who has access to these resources. AWS calls these subnets, IP address ranges, and subnets

Similar to a Facebook profile - a VPC allows you to control who can view your photos, posts, and videos.

The advantage of VPC within a public cloud provider is mainly enhanced security. You can be explicit about what resources are made publicly available, and what resources have strict access. An example would be making a web server publicly available through HTTP and HTTPS protocols, while limiting access to the connected database.

VPC's also allow you to specify a unique IP range for your application. Without a VPC, your IP range may be shared with other services on a public cloud provider. Should one of the other applications be flagged as malicious, a DNS will lump your application in with any access restrictions.

# Home Network Analogy

VPC's can be likened to a Home network. In your home network, you have:

- Wires that connect to internet.
- A modem that is the gateway to the internet.
- Wires connecting modem to router
- A router that connects to other devices on network and connects to modem for internet
- Computers / cell phones

The home private network is STILL private, even though it's connected to the internet.

Differences between removing routers and modems from your system is:

- The router can still connect to other devices if modem goes down
- If the router goes down instead, no connection are possible. Even if internet connection still coming in.

The external data flow is as follows:

Internet => Modem => Router / Switch => Firewall => Devices

For VPC's, the data flow is:

Internet => Internet Gateway => Route Table => Network Access Control List (NACL) => EC2 instances (Public) => Private Subnets.

With an analogy set, let's look at the different parts

# Internet Gateways (IGW)

These are a combination of hardware and software that provides your private network with a route to the world outside of the VPC. (Horizontally scaled so you have no bandwidth strain)

These get attached to VPC's. Without it, your VPC can communicate internally, but not with the internet.

Worth noting:

- Only one can be attached to a VPC.
- While there are active AWS Resources attached to the VPC, you can not detach the IGW. (Such as EC2 or RDS Database)

# Route Tables (RT)

These are rules that determine where network traffic is directed.

You'll have a *Main* route table, and possible supplemental route tables.

You *can* detach the IGW from the VPC, and then the route will lead to a "black hole" as AWS puts it.

- You can have multiple active route tables in a VPC
- You can't delete a route table with active "dependencies" (associated subnets)

# Network Access Control Lists (NACL)

NACL are an *optional layer of security* that acts as a firewall controlling traffic in and out of subnets. They have both *inbound* and *outbound* traffic. All traffic allowed by default.

Rules are evaluated by rule number, from lowest to highest. First rule evaluated that matches traffic type gets immediately applied and executed regardless of the rules that come after.

The wildcard symbol `*` is a catch all. If we don't allow traffic, it's denied by default.

Creating a New Network ACL will deny all by default. You add rules from there.

Different subnets can have different NACLs. 

You can control allowed protocols. If hosting a web server, you may only want to have HTTP and HTTPS.

A subnet can only be associated with one NACL at a time. 

Once resources are inside, AWS resources may have their own security measures (called Security Groups.) EC2s, for example, can set their own limits on what protocols it allows in.

# Subnets

> Definition: A sub-section of a network. Includes all the computers in a specific location.

A loose analogy - If your ISP is a network, your home is a subnetwork.

Subnets may be named like the following group:

- us-east-1a
- us-east-1b
- us-east-1c
- us-east-1d

Each are within separate availability zones. This helps create redundancy, availability, and fault tolerance. 

## Public v Private Subnets

*Public* subnets have a route to the internet. *Private* subnets do not.

Both will have separate route tables. One to internet, one not. 

In relation to your VPC and Availability Zones: A VPC spans multiple availability zones. A subnet is designated to only one.

# Availability Zones

VPC's come with multiple availability zones. They are physically separated within a region, where as subnets were logically separated. This allows our applications to have *High Availability* and *Fault Tolerance* - two important paradigms in cloud architecture.
 
> Availability Zone definition: Distinct location that are engineered to be isolated from failures in other Availability Zones. By launching instances in separate Availability Zones, you can protect your app from the failure of a single location.

These are a core benefit of using cloud services in AWS. We want duplicate resources span Availability Zones. 
 
You'll have a Primary Web Server, and a back up. As well as a Primary Redis DB, and a failover. 
 
Cloud infrastructure helps in the event of local disaster. If your home server dies, you need one off site.

A little more on High Availability and Fault Tolerance:
 
*High Availability* means the least amount of downtime as possible. It's what results in someone saying "My website is always available. I can always access my data in the cloud."
 
*Fault Tolerant* is resistance to error. It results in someone saying "One of my web servers failed, but my backup immediately took over. Or if something fails, it can repair itself."

# Nat Gateway

AWS has a shared responsibility model - there are portions of security that you are responsible, and portions that AWS is responsible for.

We are responsible for maintaining the OS of our systems. We need to update systems regularly with patches from the internet.

So, question - How do we download updates to private networks?

*NAT Gateway* solve this. A NAT Gateway sits within the public subnet and has an EIP - *Elastic IP Address*.

It has a route to the internet gateway. Once it's set up, we can update the Route Table to include the Nat Gateway. 

```
Destination: 0.0.0.0/0
Target: nat-id
```

A NAT gateway does not accept inbound traffic initiated from the internet. It only takes in outbound requests from subnet and receives responses from that request.

You don't have to manage the config for this. You will, however, need to setup NAT gateways within *all* of your private subnets.

# Sources

[AWS docs on VPC's](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)

[Cloudflare on VPC's](https://www.cloudflare.com/learning/cloud/what-is-a-virtual-private-cloud/)

[Linux Academy AWS Essentials](https://www.youtube.com/watch?v=ET_CSqdGsYg&list=PLv2a_5pNAko0Mijc6mnv04xeOut443Wnk&index=18&ab_channel=LinuxAcademy)ca