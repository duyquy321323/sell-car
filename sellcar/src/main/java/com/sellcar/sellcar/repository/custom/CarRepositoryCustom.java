package com.sellcar.sellcar.repository.custom;

import java.sql.SQLException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sellcar.sellcar.entity.Car;
import com.sellcar.sellcar.request.SearchCarRequest;

public interface CarRepositoryCustom {
    public Page<Car> findBySearchCarRequest(SearchCarRequest request, Pageable pageable) throws SQLException;
}