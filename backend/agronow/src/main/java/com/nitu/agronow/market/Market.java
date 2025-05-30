package com.nitu.agronow.market;

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
@Table(name = "markets")
@EntityListeners(AuditingEntityListener.class)
public class Market implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String location;
    private String description;
    private String schedule;
    private String imageUrl;

    @Transient
    private Integer ownerId;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;
}
