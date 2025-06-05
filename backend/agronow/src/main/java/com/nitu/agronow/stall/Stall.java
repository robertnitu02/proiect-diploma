package com.nitu.agronow.stall;

import com.nitu.agronow.market.Market;
import com.nitu.agronow.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.security.Principal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Stalls")
@EntityListeners(AuditingEntityListener.class)
public class Stall implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 64)
    private String name;
    @Column(nullable = false, length = 64)
    private String description;
    @Column(nullable = false, length = 64)
    private String imageUrl;
    @Column(nullable = false, length = 255)
    private String products;
    @Column(nullable = false, length = 16)
    private String schedule;

    @Transient
    private Integer marketPlacedId;

    @Transient
    private Integer ownerId;

    @ManyToOne
    @JoinColumn(name = "marketId", nullable = true)
    private Market market;

    @OneToOne
    @JoinColumn(name = "userId", nullable = true)
    private User user;
}
