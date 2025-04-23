package com.sellcar.sellcar.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sellcar.sellcar.entity.Car;
import com.sellcar.sellcar.enumerate.ConditionCarCode;
import com.sellcar.sellcar.repository.custom.CarRepositoryCustom;

public interface CarRepository extends JpaRepository<Car, Integer>, CarRepositoryCustom {
    @Query("SELECT c from Car c JOIN Evaluate e ON e.car.id = c.id WHERE c.condition = :condition GROUP BY c.id ORDER BY COUNT(e.id) DESC, SUM(e.rate) DESC")
    public List<Car> findRecommendCars(@Param(value = "condition") ConditionCarCode condition, Pageable pageable);
}