package com.honnomushi.springbootHonnoMushi.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.honnomushi.springbootHonnoMushi.model.Books;
import com.honnomushi.springbootHonnoMushi.service.BooksService;


@RestController
@RequestMapping("/")
public class BooksController {
	@Autowired
	private BooksService booksService;
	
	@GetMapping(value="books",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> findBooks(){
			List<Books> books = booksService.findall();
			Map<String, Object> result = new HashMap<String,Object>();
			result.put("books",books);
		    result.put("count",books.size());
		try {
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value="books/{letter}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> findBooksLetter(@PathVariable String letter){
		List<Books> booksLetter = booksService.findBooksByLetter(letter);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("booksLetter",booksLetter);
	    result.put("count",booksLetter.size());
	    result.put("letter",letter);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value="book/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> findBook(@PathVariable String id){
		List<Books> book = booksService.findBook(id);
		String message = "book found!";
		List<Object> bookFormat = new ArrayList<>();
		Map<String, Object> bookFormatObj = new HashMap<String,Object>();
		bookFormatObj.put("bookId", book.get(0).getBook_id());
		bookFormatObj.put("title", book.get(0).getTitle());
		bookFormatObj.put("authors", book.get(0).getAuthors().split("\\|"));
		bookFormatObj.put("summary", book.get(0).getDescription());
		bookFormatObj.put("pages", book.get(0).getPages());
		bookFormatObj.put("rating", book.get(0).getRating());
		bookFormatObj.put("ratingCount", book.get(0).getRating_count());
		bookFormatObj.put("image_url", book.get(0).getImage_url());
		bookFormatObj.put("genres", book.get(0).getGenres().split("\\|"));
		
		bookFormat.add(0, bookFormatObj);

		Map<String, Object> result = new HashMap<String,Object>();
	    result.put("message",message);
//	    result.put("book",book);
	    result.put("bookFormat", bookFormat);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
