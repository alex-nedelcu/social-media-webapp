package com.example.repositories;

import com.example.models.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IPictureRepository extends JpaRepository<Picture, Long> {

    Optional<Picture> findByName(String name);

}
