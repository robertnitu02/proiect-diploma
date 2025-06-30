create table users
(
    id           integer               not null
        primary key,
    admin        integer default 0     not null,
    created_date timestamp(6)          not null,
    email        varchar(100)          not null
        constraint uk6dotkott2kjsp8vw4d0m25fb7
            unique,
    enabled      boolean default false not null,
    first_name   varchar(8)            not null,
    image_url    varchar(64)           not null,
    last_name    varchar(8)            not null,
    password     varchar(255)          not null,
    market_id    integer
        constraint uk3cdu8t37dkgp1fpw4efqkbviw
            unique
        constraint fkaiupwsgmc3yc59563x29cmd4p
            references markets,
    stall_id     integer
        constraint ukhnmi7q4r4oft6xa7gk4gebtu2
            unique
        constraint fknnumnbljg1frhx1w7hh5a800d
            references stalls
);

alter table users
    owner to username;

INSERT INTO public.users (id, admin, created_date, email, enabled, first_name, image_url, last_name, password, market_id, stall_id) VALUES (1152, 0, '2025-06-07 15:35:06.301987', '2@robert.com', false, 'Test', 'https://i.imgur.com/KdcFRUp.png', 'Are', '$2a$10$H/NjYspklAEVCmZKxVMPb.ZAcJ7V5fpk66sNkrvYd0Gqwb5KILqXS', 52, null);
INSERT INTO public.users (id, admin, created_date, email, enabled, first_name, image_url, last_name, password, market_id, stall_id) VALUES (1153, 0, '2025-06-07 15:35:15.787551', '3@robert.com', false, 'Xaxa', 'https://i.imgur.com/KdcFRUp.png', 'Add', '$2a$10$ztNXStO8tBqsQeIo/ZIcEeo4MG1yu/FVlpcIdDtXWp0q0MuOh0v3e', 53, null);
INSERT INTO public.users (id, admin, created_date, email, enabled, first_name, image_url, last_name, password, market_id, stall_id) VALUES (1202, 0, '2025-06-09 00:08:08.004005', '5@robert.com', false, 'Robert', 'https://i.imgur.com/KdcFRUp.png', 'Nițu', '$2a$10$RiNGDDO3RnZSH8n6I4SDHORtp3cguyjqAgyZOcblcLOS1K6bOevy.', null, null);
INSERT INTO public.users (id, admin, created_date, email, enabled, first_name, image_url, last_name, password, market_id, stall_id) VALUES (1102, 1, '2025-06-05 17:55:55.837888', '1@robert.com', true, 'Nitu', 'https://i.imgur.com/KdcFRUp.png', 'Robert', '$2a$10$bP.scp6PGy2sxjeX.IuHYOoB/C7NvKjxdgsl4XOEIgrEz9s6/bKSu', 2, 1);
INSERT INTO public.users (id, admin, created_date, email, enabled, first_name, image_url, last_name, password, market_id, stall_id) VALUES (1252, 0, '2025-06-16 19:55:06.762925', '6@robert.com', false, 'Robert', 'https://i.imgur.com/KdcFRUp.png', 'Nițu', '$2a$10$1tV.nIQGgSR46ig8zwpI4.iD7ZFGwJrzUIg6AZhiMadaM0IWIXdYa', null, null);
INSERT INTO public.users (id, admin, created_date, email, enabled, first_name, image_url, last_name, password, market_id, stall_id) VALUES (1302, 0, '2025-06-30 13:25:13.728513', '55@robert.com', true, 'Maru', 'https://i.imgur.com/6jmGZxO.png', 'Marian', '$2a$10$f0SLZM2HrFNGGJqErEZzD.BK8o0ekhBfIluiZ7l8o/p4.9mlTaq.G', 108, null);
