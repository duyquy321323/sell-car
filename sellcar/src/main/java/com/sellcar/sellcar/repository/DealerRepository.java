package com.sellcar.sellcar.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sellcar.sellcar.entity.Dealer;

public interface DealerRepository extends JpaRepository<Dealer, Integer> {
    Optional<Dealer> findByEmail(String email);
}