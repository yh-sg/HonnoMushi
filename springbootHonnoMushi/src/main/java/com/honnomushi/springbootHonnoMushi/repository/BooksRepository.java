package com.honnomushi.springbootHonnoMushi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.honnomushi.springbootHonnoMushi.model.Books;

@Repository
public interface BooksRepository extends JpaRepository<Books, String> {
	@Query(value = "SELECT b from book2018 b WHERE b.title LIKE :letter%")
	List<Books> findBooksByLetterStartsWith(String letter);
	@Query(value="SELECT b from book2018 b WHERE b.book_id=:id")
	List<Books> findBook(String id);
}
