create table requests
(
    id          integer      not null
        primary key,
    answered_at timestamp(6),
    created_at  timestamp(6) not null,
    image_url   varchar(64)  not null,
    links       varchar(255) not null,
    message     varchar(512) not null,
    reason      varchar(126) not null,
    status      integer      not null,
    type        integer      not null,
    user_id     integer      not null
        constraint fk8usbpx9csc6opbjg1d7kvtf8c
            references users
);

alter table requests
    owner to username;

INSERT INTO public.requests (id, answered_at, created_at, image_url, links, message, reason, status, type, user_id) VALUES (752, null, '2025-06-09 00:23:50.909607', 'https://i.imgur.com/sOXg5IC.jpeg', 'CV', 'Vreau sa devin STAFF', '', 0, 1, 1153);
