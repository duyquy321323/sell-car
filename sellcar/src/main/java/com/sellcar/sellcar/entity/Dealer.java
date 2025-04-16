package com.sellcar.sellcar.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
public class Dealer extends User {
    
    @Builder.Default
    @OneToMany(mappedBy = "dealer", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Set<Contact> contacts = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "author", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Set<News> news = new HashSet<>();
}