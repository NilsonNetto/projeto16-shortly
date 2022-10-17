--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(36) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" character varying(21) NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "lastVisit" timestamp without time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    "passwordHash" character varying(150) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (6, 1, 'tb-PoIvVOA_vFW9BuiM_a', '2022-10-17 09:39:52.71595');
INSERT INTO public.sessions VALUES (7, 1, 'nrXEO3joSbKzEwnIuhCk8', '2022-10-17 09:39:59.354049');
INSERT INTO public.sessions VALUES (8, 1, 'pafBJlDkJfyYpvufL68E7', '2022-10-17 09:40:06.596324');
INSERT INTO public.sessions VALUES (9, 7, 'UoLHZR8ovZgutUERXCv1M', '2022-10-17 10:57:46.684774');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 1, 'SGwmIfjjaKyCh', 'https://gist.github.com/NilsonNetto/53760cb78bc99509aacd8ab4b6e5e7c8', 0, '2022-10-14 15:30:18.648372', '2022-10-14 15:30:18.648372');
INSERT INTO public.urls VALUES (1, 1, 'AL1Y8nAGXAXVr', 'https://gist.github.com/NilsonNetto/53760cb78bc99509aacd8ab4b6e5e7c8', 6, '2022-10-17 09:50:32.454749', '2022-10-14 15:15:37.84932');
INSERT INTO public.urls VALUES (3, 7, 'hLO19h49UJX_C', 'https://bootcampra.notion.site/Projeto-Shortly-API-21533489cd5042058524caf3429b62e4', 4, '2022-10-17 11:13:30.263123', '2022-10-17 11:10:23.842145');
INSERT INTO public.urls VALUES (5, 7, 'zFqMmtx6t65Pa', 'https://web.whatsapp.com/', 0, '2022-10-17 11:15:49.547526', '2022-10-17 11:15:49.547526');
INSERT INTO public.urls VALUES (6, 7, 'k3qk1zk0xe_YM', 'https://web.whatsapp.com/', 0, '2022-10-17 11:15:50.718462', '2022-10-17 11:15:50.718462');
INSERT INTO public.urls VALUES (7, 7, 'hEPLjUFq1dwsZ', 'https://web.whatsapp.com/', 0, '2022-10-17 11:15:53.818551', '2022-10-17 11:15:53.818551');
INSERT INTO public.urls VALUES (8, 7, 'YDhawgU-qCy9e', 'https://www.twitch.tv/fextralife', 5, '2022-10-17 11:21:37.903682', '2022-10-17 11:16:05.108209');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Testinho', 'teste@teste.com', '$2b$13$k8R8v6tph1YtydeGba2N2..8IBg11pIyRq70FyTfNiKo7bvYNc6qu', '2022-10-14 15:14:45.827052');
INSERT INTO public.users VALUES (2, 'Testinho 2', 'teste2@teste.com', '$2b$13$OXMDHsOCW5wEdyDogmDtE.mjiUku5zEJKxhsWpX4eSbhOrXSS/RQK', '2022-10-17 09:45:05.18053');
INSERT INTO public.users VALUES (3, 'Nilson Netto', 'nilson@teste.com', '$2b$13$qSNwzBVKGBjo0sYFH8fSQ.xO8tEFr4TPbEweQ8IUIxd0.ggef0Dji', '2022-10-17 10:38:25.225803');
INSERT INTO public.users VALUES (6, 'Banana', 'banana@teste.com', '$2b$13$piOPhQgPSn/v7nLJxb/3VOCS74I3J6jVJ92cMpGXZIiIoIK9Tg3F6', '2022-10-17 10:42:52.70215');
INSERT INTO public.users VALUES (7, 'Banana 02', 'banana2@teste.com', '$2b$13$IF0M3ErJMSQPBF2HIdnwIuOfQ47TXGgnmCG.zbM.YooSd6JoTbKYu', '2022-10-17 10:43:05.431315');
INSERT INTO public.users VALUES (8, 'Usuário 00', 'email01@teste.com', '$2b$13$1WsIyfb2rCZPIAJNu1hX5ewKrRIoXlK1Cq85C.Ot4LXQY.dXRsrPa', '2022-10-17 11:19:13.080387');
INSERT INTO public.users VALUES (9, 'Usuário 10', 'email10@teste.com', '$2b$13$4YdLrg/kQx/rDCq8v0gMx./JL/XZCdGYwcCr.R9DiRPiqeK8b0LgK', '2022-10-17 11:19:25.172428');
INSERT INTO public.users VALUES (10, 'Só para ter mais que 10 users', 'maisde10@teste.com', '$2b$13$GfUM6S3dQmt.xCRZSAJXYO9gxmNnJug74N1uLvRr7ZpqgLm/7ytzC', '2022-10-17 11:19:54.396013');
INSERT INTO public.users VALUES (11, 'Alien', 'alien@teste.com', '$2b$13$AZadEq6nr5oBrzikPcKLy.RgGfkBexEk.LNoUXLOvIogvVV4XYDp2', '2022-10-17 11:20:10.833073');
INSERT INTO public.users VALUES (12, 'será?', 'seraquefoi@teste.com', '$2b$13$jL74gQ0l64RyILwQFuixpeSo4xL7a3lVxKyQJuSOgnEA.b64tDjfG', '2022-10-17 11:20:20.661188');
INSERT INTO public.users VALUES (13, 'afssss', 'muitoemail@teste.com', '$2b$13$OY/LwDpKEkfU5D7QrsEsheQ1AdnR0Z9sdzqY1BUJ0p/RP9l/fxWD2', '2022-10-17 11:20:31.596746');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

