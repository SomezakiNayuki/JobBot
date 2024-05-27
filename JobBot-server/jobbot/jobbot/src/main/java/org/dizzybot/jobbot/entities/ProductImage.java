package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;

@Entity
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "outcome_images")
    private Outcome outcome;

    public ProductImage() {}
}
