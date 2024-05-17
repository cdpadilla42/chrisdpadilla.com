---
title: Layers in a Java Spring Boot API
tags:
  - Tech
  - Java
  - Spring Boot
date: '2024-05-17T10:35:07.322Z'
---

Spring Boot is a well embraced and powerful framework for developing web applications. Getting a backend API setup is fairly quick and allows for a great deal of durability up front. A fine balance between moving quickly on an app while giving you the guard rails to maintain organization, scalability, and durability.

Here's the quick-start guide to getting an API setup:

## Layers

If you're used to the MVC pattern in software development, you'll find a similar intent of organization around Spring Boot Architecture. However, the categories we group our logic in will be slightly different.

In Spring Boot, these categories are referred to as layers of the application. They have their own directories and are bundled in their own package within the application.

Here's a simple directory structure within the `src` folder of our app:


```
project/src/main/java/com/projectname
|-- controller
|    |-- ArtistController.java
|-- model
|    |-- Artist.java
|-- repositories
|    |-- ArtistRepository.java
+-- service
     |-- ArtistService.java
```

Note that tests will live in their own directory outside of the `src` folder.

Above, all layers are represented:

- The **Controller** layer is responsible for connecting our data from the service layer with a means of rendering or presentation.
- The **Model** layer handles communication between our application and external database.
- The **Repositories** layer is responsible for querying logic to our database. If the model layer is establishing communication with the database, then the repositories layer is handling what type of requests we're making available to our application.
- The **Service** layer handles all the business logic for our application. This layer relies on the repositories layer to provide the data so that it then can be transformed in whatever way we need it to be before delivery.

## In Action

Ok! So say that I have my base app setup for a Spotify Popularity Monitor API. From here, I want to setup a feature for each layer that supports CRUD operations for an `Artist`. 

I'll start with the model:

### Model

```
package com.chrispadilla.spotifyperformancemonitor.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Artist {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column
	private String name;

	@Column
	private String[] genres;

	@Column
	private String spotifyId;

	@Column
	private String spotifyUrl;

	// Getters/Setters here
	
}

```

For brevity, I'm leaving out the Getters and Setters. What I'm showing is the schema for an Artist as I want it setup in my relational DB. 

By adding `@Entity`, I'm denoting this as a persistence layer class for the JPA.

Next, I'll add the repository:

### Repository

```
package com.chrispadilla.spotifyperformancemonitor.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chrispadilla.spotifyperformancemonitor.model.Artist;

@Repository
public interface ArtistRepository extends CrudRepository<Artist, Long>{
	Artist findByName(String name);

	Artist findBySpotifyId(String spotifyId);
}
```

Fairly simple! Spring Repositories already come with several CRUD methods. I enable them by extending from `CrudRepository`. By default, I'll be able to call `findById`, but if I want to query by another field, I specify it on the interface with a method. I've done this with `findByName` and `findBySpotifyId` above. Spring will automatically make the connection that if I'm passing in a variable `spotifyId`, that this is what I'm querying by on the model. No extra logic required!

### Service

The service layer will largely depend on what I'm trying to do with the data. It goes beyond the scope of today's blog, so here's the bare bones setup for a service class:

```
package com.chrispadilla.spotifyperformancemonitor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chrispadilla.spotifyperformancemonitor.model.Artist;



@Service
public class ArtistService implements IArtistService {
	@Autowired
	private ArtistRepository artistRepository;
		

	public void collectArtist(String spotifyId) {
		// Do your stuff
	}

}

```

It's good practice to create an interface outlining the methods you'll implement, so here I'm extending from an `IArtistService` instance above.

Again, an annotation of `@Service` marks this as a bean that can be injected throughout my other layers.

### Controller

It all comes together in the controller! Here I'll setup a controller to GET and POST artists:

```
package com.chrispadilla.spotifyperformancemonitor.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.chrispadilla.spotifyperformancemonitor.model.Artist;
import com.chrispadilla.spotifyperformancemonitor.repositories.ArtistRepository;
import com.chrispadilla.spotifyperformancemonitor.service.ArtistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/artist")
public class ArtistController {
	@Autowired
	private ArtistRepository artistRepository;
	@Autowired
	private ArtistService artistService;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Artist> getArtists() {
		return artistRepository.findAll();
	}

	@GetMapping("/{id}")
	public Artist getArtist(@PathVariable Long id) {
		Artist artist = artistRepository.findById(id)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No matching ID"));
		return artist;
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Artist postArtist(@RequestBody Artist artist) {
		return artistRepository.save(artist);
	}
}

```

Several nice annotations are made available here! `RequestMapping`, `GetMapping`, and `PostMapping` allow us to define the path for our controller. `PathVariable` gives access to the `id` that's listed as part of my path in my get request. 

Here, you'll see I'm using `Autowired` to tell Spring to inject an instance of my repository and service layer classes created above. I can then use them freely within my controller.

It can be tempting to write the business logic directly in the controller. To maintain flexibility, though, it's best to leave minimal db logic in the controller and wrap up data transformation within a method on your service layer classes. This allows for a more highly decoupled system. Were I to add a **Presentation** layer, it would be far simpler to access the service layer object, as opposed to refactoring a bloated controller method. 


### That's It!

With just a few files written, we have a strong basis for a flexible and easily extendable API! All with type checking along the way and a largely decoupled system! 👏

