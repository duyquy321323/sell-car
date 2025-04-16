package com.sellcar.sellcar.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Evaluate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer rate;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;
}