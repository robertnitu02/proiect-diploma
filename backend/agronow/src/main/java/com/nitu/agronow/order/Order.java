package com.nitu.agronow.order;

import com.nitu.agronow.market.Market;
import com.nitu.agronow.stall.Stall;
import com.nitu.agronow.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Orders")
@EntityListeners(AuditingEntityListener.class)
public class Order  {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(nullable = false, length = 255)
    private String products;
    @Column(nullable = false, length = 32)
    private String address;
    @Column(nullable = false)
    private Float price;
    @Column(nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer status;

    @Column(nullable = false)
    private LocalDateTime orderDate;
    @Column(nullable = true)
    private LocalDateTime acceptedDate;
    @Column(nullable = true)
    private LocalDateTime deliveryDate;

    @Transient
    private Integer requesterId;

    @Transient
    private Integer stallId;

    @ManyToOne
    @JoinColumn(name = "stallId", nullable = true)
    private Stall stall;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = true)
    private User user;
}
