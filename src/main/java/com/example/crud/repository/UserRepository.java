package com.example.crud.repository;

//import java.util.List;

import com.example.crud.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Page<User> findByNameContainingOrderByNameAsc(String name, Pageable pageable);
    Page<User> findAllByOrderByNameAsc(Pageable pageable);
}
