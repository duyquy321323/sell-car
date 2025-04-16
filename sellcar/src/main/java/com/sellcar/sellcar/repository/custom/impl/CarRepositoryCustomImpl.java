package com.sellcar.sellcar.repository.custom.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.persistence.criteria.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.sellcar.sellcar.entity.Car;
import com.sellcar.sellcar.enumerate.ConditionCarCode;
import com.sellcar.sellcar.repository.custom.CarRepositoryCustom;
import com.sellcar.sellcar.request.SearchCarRequest;


public class CarRepositoryCustomImpl implements CarRepositoryCustom {

    @PersistenceContext // inject đối tượng EntityManager vào do spring boot quản lý vòng đời của nó
    private EntityManager entityManager;

    @Override
public Page<Car> findBySearchCarRequest(SearchCarRequest request, Pageable pageable) throws SQLException {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    
    // ------------------- QUERY TRUY VẤN DỮ LIỆU -------------------
    CriteriaQuery<Car> query = criteriaBuilder.createQuery(Car.class);
    Root<Car> root = query.from(Car.class);
    List<Predicate> predicates = buildPredicates(request, criteriaBuilder, root);

    if (!predicates.isEmpty()) {
        query.where(criteriaBuilder.and(predicates.toArray(new Predicate[0])));
    }

    query.select(root).distinct(true);

    List<Car> cars;
    int pageSize = pageable.getPageSize();
    int pageNumber = pageable.getPageNumber();
    int offset = pageSize * pageNumber;

    try {
        if(pageSize != -1){
            cars = entityManager.createQuery(query)
            .setFirstResult(offset)
            .setMaxResults(pageSize)
            .getResultList();
        } else { // nếu pageSize = -1 thì lấy tất cả xe thỏa mãn
            cars = entityManager.createQuery(query).getResultList();
        }
    } catch (Exception e) {
        throw new SQLException("Lỗi khi truy vấn danh sách: " + e.getMessage());
    }

    // ------------------- QUERY ĐẾM SỐ BẢN GHI -------------------
    CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
    Root<Car> countRoot = countQuery.from(Car.class);
    List<Predicate> countPredicates = buildPredicates(request, criteriaBuilder, countRoot);

    if (!countPredicates.isEmpty()) {
        countQuery.where(criteriaBuilder.and(countPredicates.toArray(new Predicate[0])));
    }

    countQuery.select(criteriaBuilder.count(countRoot));
    Long total;
    try {
        total = entityManager.createQuery(countQuery).getSingleResult();
    } catch (Exception e) {
        throw new SQLException("Lỗi khi đếm bản ghi: " + e.getMessage());
    }

    return new PageImpl<>(cars, pageable, total);
}

private List<Predicate> buildPredicates(SearchCarRequest request, CriteriaBuilder criteriaBuilder, Root<Car> root) {
    List<Predicate> predicates = new ArrayList<>();

    if (request.getTitle() != null && !request.getTitle().isBlank()) {
        predicates.add(criteriaBuilder.like(root.get("title"), "%" + request.getTitle() + "%"));
    }

    if (request.getCondition() != null && !request.getCondition().isBlank()) {
        predicates.add(criteriaBuilder.equal(root.get("condition"), ConditionCarCode.valueOf(request.getCondition())));
    }

    if (request.getYears() != null && !request.getYears().isEmpty()) {
        List<Predicate> yearPredicates = new ArrayList<>();
        for (String year : request.getYears()) {
            yearPredicates.add(criteriaBuilder.equal(root.get("year"), year));
        }
        predicates.add(criteriaBuilder.or(yearPredicates.toArray(new Predicate[0])));
    }

    if (request.getPriceFrom() != null) {
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), request.getPriceFrom()));
    }

    if (request.getPriceTo() != null) {
        predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), request.getPriceTo()));
    }

    if (request.getCapacity() != null) {
        predicates.add(criteriaBuilder.equal(root.get("capacity"), request.getCapacity()));
    }

    if (request.getFeaturesCodes() != null && !request.getFeaturesCodes().isEmpty()){
        List<Predicate> featurePredicates = new ArrayList<>();
        for (String featureCode : request.getFeaturesCodes()) {
            featurePredicates.add(criteriaBuilder.equal(root.join("features").get("code"), featureCode));
        }
        predicates.add(criteriaBuilder.or(featurePredicates.toArray(new Predicate[0])));
    }

    // rate là tổng của rate của các evaluate chia ra
    // điều kiện là rate >= request.getRate()
    if (request.getRate() != null) {
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(criteriaBuilder.avg(root.join("evaluates").get("rate")), Double.valueOf(String.valueOf(request.getRate()))));
    }

    return predicates;
}

    
}