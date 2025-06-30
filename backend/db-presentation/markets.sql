create table markets
(
    id          integer     not null
        primary key,
    description varchar(64) not null,
    image_url   varchar(64) not null,
    location    varchar(64) not null,
    name        varchar(16) not null,
    schedule    varchar(16) not null,
    user_id     integer
        constraint ukap134wluyko2o308xhil2yfau
            unique
        constraint fkms5b3gbxr0dkxtdn9m76esqih
            references users
);

alter table markets
    owner to username;

INSERT INTO public.markets (id, description, image_url, location, name, schedule, user_id) VALUES (2, 'Aici găsești produse proaspete direct de la producători locali. ', 'https://i.imgur.com/WUFTX10.png', 'Bucuresti', 'Piata Sudului', '09:00 - 16:00', 1102);
INSERT INTO public.markets (id, description, image_url, location, name, schedule, user_id) VALUES (52, 'O piață aglomerată, cu o varietate mare de produse locale și reg', 'https://dbonline.ro/wp-content/uploads/2022/12/cartaxo.jpg', 'Bucuresti', 'Piata Cartaxo', '07:00 - 15:00', 1152);
INSERT INTO public.markets (id, description, image_url, location, name, schedule, user_id) VALUES (53, 'Găsești legume, fructe, lactate și ouă direct de la micii produc', 'https://opiniagiurgiu.ro/wp-content/uploads/2017/04/pc.jpg', 'Bucuresti', 'Piata Centrala', '09:00 - 16:00', 1153);
INSERT INTO public.markets (id, description, image_url, location, name, schedule, user_id) VALUES (108, 'Un loc aglomerat și popular, unde găsești legume, fructe și prod', 'https://i.imgur.com/E19Grvk.jpeg', 'Bucuresti', 'Piata Crângași', '07:00 - 20:00', 1302);
