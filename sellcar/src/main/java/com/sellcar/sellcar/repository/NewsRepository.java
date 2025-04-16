package com.sellcar.sellcar.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sellcar.sellcar.entity.News;

public interface NewsRepository extends JpaRepository<News, Integer> {
    @Query("SELECT n from News n ORDER BY n.createdDate DESC")
    public List<News> findRecentNews(Pageable pageable);

    @Query("SELECT n from News n LEFT JOIN n.comments c GROUP BY n ORDER BY COUNT(c) DESC ")
    public List<News> findHotNews(Pageable pageable);
}