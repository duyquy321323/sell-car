package com.sellcar.sellcar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sellcar.sellcar.entity.Feature;

public interface FeatureRepository extends JpaRepository<Feature, Integer> {

    public List<Feature> findByCodeIn(List<String> code);
    @Query("SELECT f FROM Feature f JOIN f.cars c WHERE c.id = :carId")
    public List<Feature> findByCar_Id(@Param("carId") Integer carId);

    public List<Feature> findByCodeNot(String code);
}