package com.honnomushi.springbootHonnoMushi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "book2018")
@Table(name = "book2018")
@Getter @Setter
public class Books {
	@Id
	private String book_id;
	private String title;
	private String authors;
	private String description;
	private String edition;
	private String format;
	private int pages;
	private float rating;
	private int rating_count;
	private int review_count;
	private String genres;
	private String image_url;
	
	public Books() {
		super();
	}
	
	public Books(String book_id, String title, String authors, String description, String edition, String format, int pages, float rating, int rating_count, int review_count,String genres,String image_url) 
	{
		super();
		this.book_id = book_id;
		this.title = title;
		this.authors = authors;
		this.description = description;
		this.edition = edition;
		this.format = format;
		this.pages = pages;
		this.rating = rating;
		this.rating_count = rating_count;
		this.review_count = review_count;
		this.genres = genres;
		this.image_url = image_url;
	}
}