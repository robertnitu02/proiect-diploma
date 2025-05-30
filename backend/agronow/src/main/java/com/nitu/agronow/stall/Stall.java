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

    private String name;
    private String description;
    private String imageUrl;
    private String products;
    private String schedule;

    @Transient
    private Integer marketPlacedId;

    @Transient
    private Integer ownerId;

    @ManyToOne
    @JoinColumn(name = "marketId", nullable = false)
    private Market market;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;
}
