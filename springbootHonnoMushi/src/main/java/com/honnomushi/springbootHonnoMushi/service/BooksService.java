package com.honnomushi.springbootHonnoMushi.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.honnomushi.springbootHonnoMushi.model.Books;
import com.honnomushi.springbootHonnoMushi.repository.BooksRepository;

@Service
@Transactional
public class BooksService implements IBooksService{
	
	@Autowired
	private BooksRepository bookRepository;

	@Override
	public List<Books> findall() {
		return bookRepository.findAll();
	}

	@Override
	public List<Books> findBooksByLetter(String letter) {
		return bookRepository.findBooksByLetterStartsWith(letter);
	}

	@Override
	public List<Books> findBook(String id) {
		return bookRepository.findBook(id);
	}

}
