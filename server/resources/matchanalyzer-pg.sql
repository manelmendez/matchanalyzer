--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

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

--
-- Name: matchanalyzer; Type: SCHEMA; Schema: -; Owner: matchanalyzer
--

CREATE SCHEMA matchanalyzer;


ALTER SCHEMA matchanalyzer OWNER TO matchanalyzer;

--
-- Name: users_role; Type: TYPE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TYPE matchanalyzer.users_role AS ENUM (
    'user',
    'admin'
);


ALTER TYPE matchanalyzer.users_role OWNER TO matchanalyzer;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: assists; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.assists (
    id bigint NOT NULL,
    type character varying(50),
    goal bigint,
    "matchId" bigint,
    matchpart bigint,
    player bigint,
    "userId" bigint
);


ALTER TABLE matchanalyzer.assists OWNER TO matchanalyzer;

--
-- Name: assists_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.assists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.assists_id_seq OWNER TO matchanalyzer;

--
-- Name: assists_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.assists_id_seq OWNED BY matchanalyzer.assists.id;


--
-- Name: cards; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.cards (
    id bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint,
    type character varying(50) DEFAULT ''::character varying,
    player bigint,
    "matchId" bigint,
    "userId" bigint NOT NULL,
    matchpart bigint
);


ALTER TABLE matchanalyzer.cards OWNER TO matchanalyzer;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.cards_id_seq OWNER TO matchanalyzer;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.cards_id_seq OWNED BY matchanalyzer.cards.id;


--
-- Name: competitions; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.competitions (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    season character varying(50),
    discipline character varying(50),
    category character varying(50),
    manager bigint NOT NULL,
    "signupDate" timestamp with time zone,
    "userId" bigint NOT NULL
);


ALTER TABLE matchanalyzer.competitions OWNER TO matchanalyzer;

--
-- Name: competitions_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.competitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.competitions_id_seq OWNER TO matchanalyzer;

--
-- Name: competitions_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.competitions_id_seq OWNED BY matchanalyzer.competitions.id;


--
-- Name: goals; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.goals (
    id bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint NOT NULL,
    type character varying(50) DEFAULT ''::character varying,
    player bigint,
    "matchId" bigint,
    "userId" bigint NOT NULL,
    matchpart bigint
);


ALTER TABLE matchanalyzer.goals OWNER TO matchanalyzer;

--
-- Name: goals_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.goals_id_seq OWNER TO matchanalyzer;

--
-- Name: goals_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.goals_id_seq OWNED BY matchanalyzer.goals.id;


--
-- Name: matches; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.matches (
    id bigint NOT NULL,
    "localTeam" bigint,
    "awayTeam" bigint,
    "matchDay" date,
    round bigint NOT NULL,
    competition bigint NOT NULL,
    "localTeamGoals" bigint NOT NULL,
    "awayTeamGoals" bigint NOT NULL,
    "userId" bigint NOT NULL
);


ALTER TABLE matchanalyzer.matches OWNER TO matchanalyzer;

--
-- Name: matches_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.matches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.matches_id_seq OWNER TO matchanalyzer;

--
-- Name: matches_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.matches_id_seq OWNED BY matchanalyzer.matches.id;


--
-- Name: matchparts; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.matchparts (
    id bigint NOT NULL,
    "matchId" bigint NOT NULL,
    formation character varying(50),
    "time" bigint,
    team bigint,
    "userId" bigint NOT NULL
);


ALTER TABLE matchanalyzer.matchparts OWNER TO matchanalyzer;

--
-- Name: matchparts_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.matchparts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.matchparts_id_seq OWNER TO matchanalyzer;

--
-- Name: matchparts_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.matchparts_id_seq OWNED BY matchanalyzer.matchparts.id;


--
-- Name: minutes; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.minutes (
    id bigint NOT NULL,
    player bigint NOT NULL,
    matchpart bigint NOT NULL,
    "matchId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    "position" character varying(50)
);


ALTER TABLE matchanalyzer.minutes OWNER TO matchanalyzer;

--
-- Name: minutes_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.minutes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.minutes_id_seq OWNER TO matchanalyzer;

--
-- Name: minutes_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.minutes_id_seq OWNED BY matchanalyzer.minutes.id;


--
-- Name: players; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.players (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    avatar character varying(255),
    year integer NOT NULL,
    team bigint,
    "position" character varying(255) DEFAULT ''::character varying NOT NULL,
    "userId" bigint NOT NULL
);


ALTER TABLE matchanalyzer.players OWNER TO matchanalyzer;

--
-- Name: players_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.players_id_seq OWNER TO matchanalyzer;

--
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.players_id_seq OWNED BY matchanalyzer.players.id;


--
-- Name: rounds; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.rounds (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    date date,
    competition bigint NOT NULL,
    "userId" bigint NOT NULL
);


ALTER TABLE matchanalyzer.rounds OWNER TO matchanalyzer;

--
-- Name: rounds_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.rounds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.rounds_id_seq OWNER TO matchanalyzer;

--
-- Name: rounds_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.rounds_id_seq OWNED BY matchanalyzer.rounds.id;


--
-- Name: substitutions; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.substitutions (
    id bigint NOT NULL,
    "playerIn" bigint,
    "playerOut" bigint,
    minute bigint DEFAULT '0'::bigint,
    "matchId" bigint,
    "userId" bigint NOT NULL,
    matchpart bigint
);


ALTER TABLE matchanalyzer.substitutions OWNER TO matchanalyzer;

--
-- Name: substitutions_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.substitutions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.substitutions_id_seq OWNER TO matchanalyzer;

--
-- Name: substitutions_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.substitutions_id_seq OWNED BY matchanalyzer.substitutions.id;


--
-- Name: teams; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.teams (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    avatar character varying(255),
    "signupDate" timestamp with time zone,
    manager bigint,
    season character varying(50) DEFAULT ''::character varying NOT NULL,
    competition bigint,
    "userId" bigint NOT NULL
);


ALTER TABLE matchanalyzer.teams OWNER TO matchanalyzer;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.teams_id_seq OWNER TO matchanalyzer;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.teams_id_seq OWNED BY matchanalyzer.teams.id;


--
-- Name: users; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.users (
    id bigint NOT NULL,
    email character varying(255) DEFAULT ''::character varying NOT NULL,
    name character varying(255),
    avatar character varying(255),
    provider character varying(255) DEFAULT ''::character varying NOT NULL,
    provider_id bigint,
    password character varying(255) DEFAULT ''::character varying NOT NULL,
    "signupDate" timestamp with time zone,
    "lastLogin" timestamp with time zone,
    role matchanalyzer.users_role DEFAULT 'user'::matchanalyzer.users_role NOT NULL
);


ALTER TABLE matchanalyzer.users OWNER TO matchanalyzer;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.users_id_seq OWNER TO matchanalyzer;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER SEQUENCE matchanalyzer.users_id_seq OWNED BY matchanalyzer.users.id;

ALTER TABLE ONLY matchanalyzer.assists ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.assists_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.cards_id_seq'::regclass);


--
-- Name: competitions id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.competitions ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.competitions_id_seq'::regclass);


--
-- Name: goals id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.goals_id_seq'::regclass);


--
-- Name: matches id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.matches_id_seq'::regclass);


--
-- Name: matchparts id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.matchparts_id_seq'::regclass);


--
-- Name: minutes id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.minutes_id_seq'::regclass);


--
-- Name: players id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.players ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.players_id_seq'::regclass);


--
-- Name: rounds id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.rounds ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.rounds_id_seq'::regclass);


--
-- Name: substitutions id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.substitutions_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.teams ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.users ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.users_id_seq'::regclass);


--
-- Data for Name: assists; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.assists (id, type, goal, "matchId", matchpart, player, "userId") FROM stdin;
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.cards (id, minute, type, player, "matchId", "userId", matchpart) FROM stdin;
\.


--
-- Data for Name: competitions; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.competitions (id, name, season, discipline, category, manager, "signupDate", "userId") FROM stdin;
3	2a División Grupo 5	19/20	F7	Alevín	4	2019-11-22 15:23:25+01	4
6	1a División Grupo 2	18/19	F7	Alevín	4	2020-01-17 12:41:28+01	4
\.


--
-- Data for Name: goals; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.goals (id, minute, type, player, "matchId", "userId", matchpart) FROM stdin;
26	6	\N	10	10	4	22
27	9	\N	9	10	4	22
28	12	\N	9	10	4	22
29	10	\N	3	10	4	23
30	10	\N	6	10	4	24
31	7	\N	7	10	4	25
33	4	\N	9	15	4	26
34	8	\N	8	15	4	26
35	10	\N	10	15	4	26
36	12	\N	10	15	4	26
37	1	\N	7	15	4	27
38	10	\N	6	15	4	28
39	12	\N	5	15	4	28
40	14	\N	10	15	4	28
41	15	\N	6	15	4	28
42	15	\N	10	15	4	28
43	1	\N	9	15	4	29
44	2	\N	4	15	4	29
45	4	\N	4	15	4	29
46	6	\N	9	15	4	29
47	7	\N	8	15	4	29
48	9	\N	10	15	4	29
49	11	\N	8	15	4	29
51	13	\N	8	10	4	25
\.


--
-- Data for Name: matches; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.matches (id, "localTeam", "awayTeam", "matchDay", round, competition, "localTeamGoals", "awayTeamGoals", "userId") FROM stdin;
6	18	19	2019-12-03	13	3	4	5	4
7	20	21	2019-12-03	13	3	2	1	4
8	16	22	2019-12-03	13	3	12	5	4
9	27	17	2019-12-03	13	3	2	4	4
10	13	23	2019-12-03	13	3	8	0	4
11	24	28	2019-12-03	13	3	5	4	4
12	15	14	2019-12-03	13	3	1	5	4
13	22	20	2019-12-03	14	3	4	0	4
14	21	15	2019-12-03	14	3	4	6	4
15	28	13	2019-12-03	14	3	0	18	4
16	17	25	2019-12-03	14	3	6	2	4
17	23	16	2019-12-03	14	3	7	3	4
18	19	27	2019-12-03	14	3	5	2	4
19	26	24	2019-12-03	14	3	0	3	4
20	14	18	2019-12-03	14	3	3	2	4
21	20	23	2019-12-03	15	3	5	1	4
22	19	14	2019-12-03	15	3	1	2	4
23	18	21	2019-12-03	15	3	3	2	4
24	16	28	2019-12-03	15	3	15	0	4
25	24	17	2019-12-03	15	3	2	4	4
26	27	25	2019-12-03	15	3	1	2	4
27	13	26	2019-12-03	15	3	8	0	4
28	15	22	2019-12-03	15	3	4	3	4
29	22	18	2019-12-03	16	3	3	2	4
30	17	13	2019-12-03	16	3	0	8	4
31	28	20	2019-12-03	16	3	1	5	4
32	23	15	2019-12-03	16	3	2	0	4
33	21	19	2019-12-03	16	3	5	4	4
34	26	16	2019-12-03	16	3	3	4	4
35	14	27	2019-12-03	16	3	4	1	4
36	25	24	2019-12-03	16	3	5	1	4
37	20	26	2019-12-03	17	3	1	3	4
38	16	17	2019-12-03	17	3	4	4	4
39	14	21	2019-12-03	17	3	3	2	4
40	19	22	2019-12-03	17	3	5	7	4
41	27	24	2019-12-03	17	3	5	6	4
42	13	25	2019-12-03	17	3	6	0	4
43	15	28	2019-12-03	17	3	6	0	4
44	18	23	2019-12-03	17	3	3	0	4
45	22	14	2019-12-03	18	3	1	4	4
46	28	18	2019-12-03	18	3	0	8	4
47	23	19	2019-12-03	18	3	4	2	4
48	17	20	2019-12-03	18	3	3	2	4
49	26	15	2019-12-03	18	3	4	4	4
50	24	13	2019-12-03	18	3	0	13	4
51	25	16	2019-12-03	18	3	3	6	4
52	21	27	2019-12-03	18	3	4	3	4
53	15	17	2019-12-03	19	3	5	2	4
54	20	25	2019-12-03	19	3	6	2	4
55	21	22	2019-12-03	19	3	0	4	4
56	16	24	2019-12-03	19	3	2	3	4
57	18	26	2019-12-03	19	3	3	2	4
58	27	13	2019-12-03	19	3	2	6	4
59	14	23	2019-12-03	19	3	4	0	4
60	19	28	2019-12-03	19	3	6	0	4
61	25	15	2019-12-03	20	3	3	7	4
62	22	27	2019-12-03	20	3	2	3	4
63	23	21	2019-12-03	20	3	1	5	4
64	17	18	2019-12-03	20	3	2	1	4
65	26	19	2019-12-03	20	3	1	2	4
66	24	20	2019-12-03	20	3	1	3	4
67	28	14	2019-12-03	20	3	2	5	4
68	13	16	2019-12-03	20	3	6	2	4
69	22	23	2019-12-03	21	3	3	4	4
70	20	13	2019-12-03	21	3	0	7	4
71	18	25	2019-12-03	21	3	4	2	4
72	21	28	2019-12-03	21	3	9	0	4
73	19	17	2019-12-03	21	3	3	2	4
74	27	16	2019-12-03	21	3	2	3	4
75	14	26	2019-12-03	21	3	4	1	4
76	15	24	2019-12-03	21	3	7	5	4
77	25	19	2019-12-14	22	3	7	4	4
78	28	22	2019-12-14	22	3	4	5	4
79	16	20	2019-12-14	22	3	1	0	4
80	17	14	2019-12-14	22	3	1	1	4
81	26	21	2019-12-14	22	3	2	3	4
82	24	18	2019-12-14	22	3	4	5	4
83	23	27	2019-12-16	22	3	2	3	4
84	13	15	2019-12-16	22	3	10	4	4
85	18	13	2019-12-21	23	3	2	5	4
86	19	24	2019-12-21	23	3	4	1	4
87	22	26	2019-12-21	23	3	5	2	4
88	23	28	2019-12-21	23	3	4	1	4
89	15	16	2019-12-21	23	3	1	5	4
90	27	20	2019-12-21	23	3	3	1	4
91	14	25	2019-12-21	23	3	1	3	4
96	21	17	2019-12-31	23	3	1	5	4
97	20	15	2020-01-11	25	3	2	6	4
98	25	21	2020-01-11	25	3	1	1	4
99	28	27	2020-01-11	25	3	0	9	4
100	16	18	2020-01-11	25	3	4	1	4
101	17	22	2020-01-11	25	3	2	5	4
102	26	23	2020-01-11	25	3	2	1	4
103	24	14	2020-01-11	25	3	2	5	4
104	13	19	2020-01-11	25	3	12	0	4
105	41	31	2020-01-17	28	6	1	9	4
106	32	43	2020-01-17	28	6	16	1	4
107	44	42	2020-01-17	28	6	2	2	4
108	38	45	2020-01-17	28	6	6	3	4
109	33	34	2020-01-17	28	6	6	7	4
110	35	39	2020-01-17	28	6	8	6	4
111	36	37	2020-01-17	28	6	2	2	4
112	49	40	2020-01-17	28	6	2	6	4
113	34	36	2020-01-17	29	6	2	2	4
114	31	49	2020-01-17	29	6	10	0	4
115	37	35	2020-01-17	29	6	2	2	4
116	45	33	2020-01-17	29	6	2	4	4
117	39	44	2020-01-17	29	6	1	6	4
118	40	38	2020-01-17	29	6	3	5	4
119	43	41	2020-01-17	29	6	1	6	4
120	42	32	2020-01-17	29	6	0	10	4
121	32	39	2020-01-17	30	6	12	1	4
122	38	31	2020-01-17	30	6	5	4	4
123	33	36	2020-01-17	30	6	6	3	4
124	35	34	2020-01-17	30	6	5	1	4
125	41	42	2020-01-17	30	6	1	3	4
126	49	43	2020-01-17	30	6	3	2	4
127	44	37	2020-01-17	30	6	1	1	4
128	45	40	2020-01-17	30	6	5	4	4
129	39	41	2020-01-17	31	6	5	2	4
130	31	45	2020-01-17	31	6	9	0	4
131	36	35	2020-01-17	31	6	2	5	4
132	43	38	2020-01-17	31	6	3	3	4
133	40	33	2020-01-17	31	6	2	10	4
134	34	44	2020-01-17	31	6	7	2	4
135	42	49	2020-01-17	31	6	7	2	4
136	37	32	2020-01-17	31	6	0	7	4
137	41	37	2020-01-17	32	6	8	3	4
138	38	42	2020-01-17	32	6	6	0	4
139	44	36	2020-01-17	32	6	4	4	4
140	40	31	2020-01-17	32	6	3	7	4
141	33	35	2020-01-17	32	6	3	3	4
142	32	34	2020-01-17	32	6	1	2	4
143	45	43	2020-01-17	32	6	4	3	4
144	49	39	2020-01-17	32	6	2	2	4
145	43	40	2020-01-17	33	6	9	1	4
146	36	32	2020-01-17	33	6	0	13	4
147	31	33	2020-01-17	33	6	3	3	4
148	34	41	2020-01-17	33	6	6	5	4
149	35	44	2020-01-17	33	6	3	1	4
150	39	38	2020-01-17	33	6	1	2	4
151	37	49	2020-01-17	33	6	11	1	4
152	42	45	2020-01-17	33	6	6	2	4
153	49	34	2020-01-17	34	6	2	4	4
154	41	36	2020-01-17	34	6	2	5	4
155	31	43	2020-01-17	34	6	7	0	4
156	38	37	2020-01-17	34	6	6	2	4
157	32	35	2020-01-17	34	6	5	0	4
158	33	44	2020-01-17	34	6	5	2	4
159	40	42	2020-01-17	34	6	1	3	4
160	45	39	2020-01-17	34	6	4	3	4
161	36	49	2020-01-17	35	6	8	2	4
162	37	45	2020-01-17	35	6	4	3	4
163	35	41	2020-01-17	35	6	5	2	4
164	39	40	2020-01-17	35	6	1	1	4
165	43	33	2020-01-17	35	6	0	8	4
166	42	31	2020-01-17	35	6	3	3	4
167	44	32	2020-01-17	35	6	1	6	4
168	34	38	2020-01-17	35	6	3	0	4
169	31	39	2020-01-17	36	6	4	1	4
170	41	44	2020-01-17	36	6	1	1	4
171	38	36	2020-01-17	36	6	2	0	4
172	40	37	2020-01-17	36	6	4	1	4
173	43	42	2020-01-17	36	6	1	6	4
174	49	35	2020-01-17	36	6	1	4	4
175	45	34	2020-01-17	36	6	2	2	4
176	33	32	2020-01-17	36	6	3	5	4
177	39	43	2020-01-17	37	6	7	1	4
178	37	31	2020-01-17	37	6	3	7	4
179	32	41	2020-01-17	37	6	10	2	4
180	36	45	2020-01-17	37	6	5	1	4
181	35	38	2020-01-17	37	6	2	3	4
182	34	40	2020-01-17	37	6	8	0	4
183	44	49	2020-01-17	37	6	3	2	4
184	42	33	2020-01-17	37	6	0	6	4
185	42	39	2020-01-17	38	6	2	4	4
186	31	34	2020-01-17	38	6	3	1	4
187	45	35	2020-01-17	38	6	0	1	4
188	38	44	2020-01-17	38	6	3	2	4
189	40	36	2020-01-17	38	6	2	4	4
190	43	37	2020-01-17	38	6	0	5	4
191	49	32	2020-01-17	38	6	1	18	4
192	33	41	2020-01-17	38	6	3	1	4
193	41	49	2020-01-17	39	6	8	5	4
194	36	31	2020-01-17	39	6	3	4	4
195	32	38	2020-01-17	39	6	12	0	4
196	35	40	2020-01-17	39	6	6	0	4
197	39	33	2020-01-17	39	6	0	5	4
198	44	45	2020-01-17	39	6	1	1	4
199	37	42	2020-01-17	39	6	3	2	4
200	34	43	2020-01-17	39	6	7	2	4
201	45	32	2020-01-17	40	6	1	12	4
202	31	35	2020-01-17	40	6	3	1	4
203	38	41	2020-01-17	40	6	3	1	4
204	33	49	2020-01-17	40	6	7	1	4
205	40	44	2020-01-17	40	6	2	2	4
206	43	36	2020-01-17	40	6	3	2	4
207	39	37	2020-01-17	40	6	0	4	4
208	42	34	2020-01-17	40	6	2	6	4
209	41	45	2020-01-17	41	6	10	3	4
210	49	38	2020-01-17	41	6	1	6	4
211	36	42	2020-01-17	41	6	7	2	4
212	33	37	2020-01-17	41	6	4	1	4
213	35	43	2020-01-17	41	6	7	6	4
214	32	40	2020-01-17	41	6	18	1	4
215	34	39	2020-01-17	41	6	9	2	4
216	44	31	2020-01-17	41	6	1	6	4
217	42	35	2020-01-17	42	6	0	6	4
218	38	33	2020-01-17	42	6	2	3	4
219	45	49	2020-01-17	42	6	4	4	4
220	31	32	2020-01-17	42	6	2	3	4
221	39	36	2020-01-17	42	6	1	2	4
222	43	44	2020-01-17	42	6	3	2	4
223	40	41	2020-01-17	42	6	6	5	4
224	37	34	2020-01-17	42	6	5	0	4
225	39	35	2020-01-17	43	6	3	2	4
226	31	41	2020-01-17	43	6	7	1	4
227	43	32	2020-01-17	43	6	1	11	4
228	45	38	2020-01-17	43	6	2	3	4
229	34	33	2020-01-17	43	6	1	2	4
230	40	49	2020-01-17	43	6	2	0	4
231	42	44	2020-01-17	43	6	2	2	4
232	37	36	2020-01-17	43	6	4	3	4
233	41	43	2020-01-17	44	6	3	6	4
234	32	42	2020-01-17	44	6	12	1	4
235	38	40	2020-01-17	44	6	9	0	4
236	33	45	2020-01-17	44	6	7	0	4
237	44	39	2020-01-17	44	6	2	2	4
238	35	37	2020-01-17	44	6	3	1	4
239	36	34	2020-01-17	44	6	0	3	4
240	49	31	2020-01-17	44	6	2	2	4
241	39	32	2020-01-17	45	6	3	7	4
242	34	35	2020-01-17	45	6	5	2	4
243	36	33	2020-01-17	45	6	1	2	4
244	43	49	2020-01-17	45	6	6	3	4
245	31	38	2020-01-17	45	6	4	2	4
246	40	45	2020-01-17	45	6	4	0	4
247	42	41	2020-01-17	45	6	5	4	4
248	37	44	2020-01-17	45	6	2	0	4
249	41	39	2020-01-17	46	6	4	1	4
250	32	37	2020-01-17	46	6	7	1	4
251	33	40	2020-01-17	46	6	13	0	4
252	45	31	2020-01-17	46	6	4	6	4
253	38	43	2020-01-17	46	6	7	1	4
254	35	36	2020-01-17	46	6	5	4	4
255	49	42	2020-01-17	46	6	2	4	4
256	44	34	2020-01-17	46	6	5	1	4
257	31	40	2020-01-17	47	6	8	0	4
258	43	45	2020-01-17	47	6	6	5	4
259	39	49	2020-01-17	47	6	9	1	4
260	36	44	2020-01-17	47	6	5	2	4
261	42	38	2020-01-17	47	6	1	7	4
262	37	41	2020-01-17	47	6	6	0	4
263	35	33	2020-01-17	47	6	5	5	4
264	34	32	2020-01-17	47	6	1	10	4
265	41	34	2020-01-17	48	6	1	2	4
266	33	31	2020-01-17	48	6	7	2	4
267	32	36	2020-01-17	48	6	8	0	4
268	49	37	2020-01-17	48	6	1	7	4
269	38	39	2020-01-17	48	6	2	2	4
270	45	42	2020-01-17	48	6	1	4	4
271	40	43	2020-01-17	48	6	3	3	4
272	44	35	2020-01-17	48	6	1	3	4
273	39	45	2020-01-17	49	6	6	4	4
274	36	41	2020-01-17	49	6	4	1	4
275	43	31	2020-01-17	49	6	1	6	4
276	44	33	2020-01-17	49	6	0	1	4
277	37	38	2020-01-17	49	6	0	4	4
278	42	40	2020-01-17	49	6	2	5	4
279	35	32	2020-01-17	49	6	2	2	4
280	34	49	2020-01-17	49	6	16	5	4
281	41	35	2020-01-17	50	6	4	3	4
282	32	44	2020-01-17	50	6	7	0	4
283	31	42	2020-01-17	50	6	7	2	4
284	40	39	2020-01-17	50	6	5	5	4
285	33	43	2020-01-17	50	6	10	0	4
286	38	34	2020-01-17	50	6	4	3	4
287	49	36	2020-01-17	50	6	2	6	4
288	45	37	2020-01-17	50	6	2	2	4
289	37	40	2020-01-17	51	6	3	3	4
290	44	41	2020-01-17	51	6	1	2	4
291	35	49	2020-01-17	51	6	7	3	4
292	39	31	2020-01-17	51	6	2	7	4
293	36	38	2020-01-17	51	6	1	3	4
294	42	43	2020-01-17	51	6	2	5	4
295	32	33	2020-01-17	51	6	6	2	4
296	34	45	2020-01-17	51	6	7	3	4
297	49	44	2020-01-17	52	6	2	10	4
298	41	32	2020-01-17	52	6	2	11	4
299	45	36	2020-01-17	52	6	2	1	4
300	31	37	2020-01-17	52	6	4	2	4
301	40	34	2020-01-17	52	6	5	4	4
302	43	39	2020-01-17	52	6	4	4	4
303	33	42	2020-01-17	52	6	7	1	4
304	38	35	2020-01-17	52	6	5	2	4
305	39	42	2020-01-17	53	6	3	0	4
306	41	33	2020-01-17	53	6	3	5	4
307	32	49	2020-01-17	53	6	18	0	4
308	44	38	2020-01-17	53	6	1	4	4
309	35	45	2020-01-17	53	6	12	1	4
310	36	40	2020-01-17	53	6	5	2	4
311	37	43	2020-01-17	53	6	5	4	4
312	34	31	2020-01-17	53	6	6	4	4
313	45	44	2020-01-17	54	6	2	2	4
314	33	39	2020-01-17	54	6	1	0	4
315	31	36	2020-01-17	54	6	4	0	4
316	42	37	2020-01-17	54	6	1	3	4
317	38	32	2020-01-17	54	6	2	3	4
318	43	34	2020-01-17	54	6	1	5	4
319	40	35	2020-01-17	54	6	2	4	4
320	49	41	2020-01-17	54	6	4	9	4
321	41	38	2020-01-17	55	6	2	7	4
322	49	33	2020-01-17	55	6	0	11	4
323	44	40	2020-01-17	55	6	9	3	4
324	32	45	2020-01-17	55	6	11	0	4
325	35	31	2020-01-17	55	6	1	7	4
326	36	43	2020-01-17	55	6	3	2	4
327	37	39	2020-01-17	55	6	2	6	4
328	34	42	2020-01-17	55	6	6	1	4
329	38	49	2020-01-17	56	6	16	0	4
330	43	35	2020-01-17	56	6	3	3	4
331	31	44	2020-01-17	56	6	4	1	4
332	39	34	2020-01-17	56	6	4	8	4
333	40	32	2020-01-17	56	6	1	16	4
334	42	36	2020-01-17	56	6	3	5	4
335	45	41	2020-01-17	56	6	2	7	4
336	37	33	2020-01-17	56	6	0	5	4
337	41	40	2020-01-17	57	6	4	6	4
338	32	31	2020-01-17	57	6	2	3	4
339	36	39	2020-01-17	57	6	4	3	4
340	34	37	2020-01-17	57	6	10	0	4
341	33	38	2020-01-17	57	6	4	2	4
342	49	45	2020-01-17	57	6	5	2	4
343	35	42	2020-01-17	57	6	7	1	4
344	44	43	2020-01-17	57	6	3	3	4
345	18	20	2020-01-20	58	3	3	2	4
346	21	24	2020-01-20	58	3	11	2	4
347	23	17	2020-01-20	58	3	1	3	4
348	27	15	2020-01-20	58	3	3	8	4
349	14	13	2020-01-20	58	3	0	2	4
350	19	16	2020-01-20	58	3	4	5	4
351	28	26	2020-01-20	58	3	2	2	4
352	17	28	2020-01-27	59	3	13	1	4
353	20	19	2020-01-27	59	3	2	1	4
354	25	23	2020-01-27	59	3	3	0	4
355	15	18	2020-01-27	59	3	3	5	4
356	16	14	2020-01-27	59	3	4	8	4
357	27	26	2020-01-27	59	3	3	2	4
358	24	22	2020-01-27	59	3	2	2	4
359	13	21	2020-01-27	59	3	7	0	4
360	22	25	2020-01-30	58	3	1	3	4
361	22	13	2020-02-02	60	3	0	9	4
362	18	27	2020-02-02	60	3	6	0	4
363	23	24	2020-02-02	60	3	1	6	4
364	21	16	2020-02-02	60	3	6	3	4
365	28	25	2020-02-02	60	3	0	6	4
366	26	17	2020-02-02	60	3	7	1	4
367	14	20	2020-02-02	60	3	3	1	4
368	19	15	2020-02-03	60	3	1	3	4
369	22	16	2020-02-10	61	3	3	6	4
370	17	27	2020-02-10	61	3	5	0	4
371	23	13	2020-02-10	61	3	1	9	4
372	21	20	2020-02-10	61	3	4	4	4
373	28	24	2020-02-10	61	3	0	6	4
374	26	25	2020-02-10	61	3	1	0	4
375	14	15	2020-02-10	61	3	3	2	4
376	19	18	2020-02-10	61	3	2	2	4
377	20	22	2020-02-17	62	3	1	1	4
378	16	23	2020-02-17	62	3	3	0	4
379	15	21	2020-02-17	62	3	5	3	4
380	25	17	2020-02-17	62	3	1	3	4
381	24	26	2020-02-17	62	3	1	3	4
382	27	19	2020-02-17	62	3	0	1	4
383	13	28	2020-02-17	62	3	20	0	4
384	18	14	2020-02-17	62	3	0	6	4
385	22	15	2020-03-06	63	3	4	2	4
386	25	27	2020-03-06	63	3	2	2	4
387	23	20	2020-03-06	63	3	2	10	4
388	28	16	2020-03-06	63	3	0	6	4
389	21	18	2020-03-06	63	3	3	4	4
390	17	24	2020-03-06	63	3	3	1	4
391	14	19	2020-03-06	63	3	13	2	4
392	26	13	2020-03-06	63	3	2	5	4
393	19	21	2020-03-08	64	3	2	4	4
394	15	23	2020-03-08	64	3	6	0	4
395	16	26	2020-03-08	64	3	3	6	4
396	27	14	2020-03-08	64	3	4	7	4
397	18	22	2020-03-08	64	3	4	3	4
398	24	25	2020-03-08	64	3	1	6	4
399	20	28	2020-03-08	64	3	6	1	4
400	13	17	2020-03-08	64	3	9	0	4
401	25	26	2020-03-14	13	3	5	3	4
\.


--
-- Data for Name: matchparts; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.matchparts (id, "matchId", formation, "time", team, "userId") FROM stdin;
22	10	3-1-2	15	13	4
23	10	3-1-2	15	13	4
24	10	3-1-2	15	13	4
25	10	3-1-2	15	13	4
26	15	3-1-2	15	13	4
27	15	3-1-2	15	13	4
28	15	3-1-2	15	13	4
29	15	3-1-2	15	13	4
\.


--
-- Data for Name: minutes; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.minutes (id, player, matchpart, "matchId", "userId", "position") FROM stdin;
2	1	22	10	4	PT
3	2	22	10	4	CT
4	4	22	10	4	LD
5	6	22	10	4	LI
6	7	22	10	4	MC
7	10	22	10	4	DC
12	9	22	10	4	DC
13	1	23	10	4	PT
14	2	23	10	4	CT
15	3	23	10	4	LD
16	5	23	10	4	LI
17	8	23	10	4	MC
18	9	23	10	4	DC
19	10	23	10	4	DC
20	1	24	10	4	PT
22	3	24	10	4	CT
23	4	24	10	4	LD
24	5	24	10	4	LI
25	7	24	10	4	MC
26	6	24	10	4	DC
27	8	24	10	4	DC
28	1	25	10	4	PT
29	2	25	10	4	CT
30	4	25	10	4	LD
31	6	25	10	4	LI
32	7	25	10	4	MC
33	10	25	10	4	DC
34	9	25	10	4	DC
35	1	26	15	4	PT
36	3	26	15	4	CT
37	4	26	15	4	LD
38	5	26	15	4	LI
39	8	26	15	4	MC
40	9	26	15	4	DC
41	10	26	15	4	DC
42	1	27	15	4	PT
43	2	27	15	4	CT
44	3	27	15	4	LD
45	6	27	15	4	LI
46	7	27	15	4	MC
47	9	27	15	4	DC
48	8	27	15	4	DC
49	1	28	15	4	PT
50	2	28	15	4	CT
51	4	28	15	4	LD
52	5	28	15	4	LI
53	7	28	15	4	MC
54	6	28	15	4	DC
55	10	28	15	4	DC
56	1	29	15	4	PT
57	3	29	15	4	CT
58	4	29	15	4	LD
59	5	29	15	4	LI
60	2	29	15	4	MC
61	8	29	15	4	DC
62	9	29	15	4	DC
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.players (id, name, avatar, year, team, "position", "userId") FROM stdin;
1	Pau Sabio	assets/images/person_icon.png	2009	13	PT	4
2	Adrián Cuadrado	assets/images/person_icon.png	2009	13	CT	4
3	Vadym Bilanchyk	assets/images/person_icon.png	2009	13	CT	4
4	Marc Morilla	assets/images/person_icon.png	2009	13	LD	4
5	Luc Gironès	assets/images/person_icon.png	2009	13	LI	4
6	Pol Moreno	assets/images/person_icon.png	2009	13	LD	4
7	Alfredo Tiffón	assets/images/person_icon.png	2009	13	MC	4
8	Roberto Tomás	assets/images/person_icon.png	2009	13	MP	4
9	Taemin Noh	assets/images/person_icon.png	2009	13	DC	4
10	Welson Jiménez	assets/images/person_icon.png	2009	13	DC	4
13	Michele Grondona	assets/images/person_icon.png	2007	31	CT	4
15	Andrés Torres Castellarnau	assets/images/person_icon.png	2007	31	LD	4
16	Natxo Montero Raya	assets/images/person_icon.png	2007	31	LI	4
21	Alejandro Santiago Vargas	assets/images/person_icon.png	2007	31	DC	4
12	David Lloret Montes	\N	2007	31	PT	4
14	Álex Carrillo Espejo	\N	2007	31	LD	4
18	Germán Guillén Sala	\N	2007	31	MC	4
17	Xavi Pérez Molinero	\N	2007	31	MCD	4
20	Hugo Recio Punzano	\N	2007	31	DC	4
19	Pol Mora Cañete	\N	2007	31	MP	4
11	Daniel Oliva Bermúdez	\N	2007	31	PT	4
\.


--
-- Data for Name: rounds; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.rounds (id, name, date, competition, "userId") FROM stdin;
13	Jornada 1	2019-12-03	3	4
14	Jornada 2	2019-12-03	3	4
15	Jornada 3	2019-12-03	3	4
16	Jornada 4	2019-12-03	3	4
17	Jornada 5	2019-12-03	3	4
18	Jornada 6	2019-12-03	3	4
19	Jornada 7	2019-12-03	3	4
20	Jornada 8	2019-12-03	3	4
21	Jornada 9	2019-12-03	3	4
22	Jornada 10	2019-12-14	3	4
23	Jornada 11	2019-12-21	3	4
25	Jornada 12	2020-01-11	3	4
28	Jornada 1	2020-01-17	6	4
29	Jornada 2	2020-01-17	6	4
30	Jornada 3	2020-01-17	6	4
31	Jornada 4	2020-01-17	6	4
32	Jornada 5	2020-01-17	6	4
33	Jornada 6	2020-01-17	6	4
34	Jornada 7	2020-01-17	6	4
35	Jornada 8	2020-01-17	6	4
36	Jornada 9	2020-01-17	6	4
37	Jornada 10	2020-01-17	6	4
38	Jornada 11	2020-01-17	6	4
39	Jornada 12	2020-01-17	6	4
40	Jornada 13	2020-01-17	6	4
41	Jornada 14	2020-01-17	6	4
42	Jornada 15	2020-01-17	6	4
43	Jornada 16	2020-01-17	6	4
44	Jornada 17	2020-01-17	6	4
45	Jornada 18	2020-01-17	6	4
46	Jornada 19	2020-01-17	6	4
47	Jornada 20	2020-01-17	6	4
48	Jornada 21	2020-01-17	6	4
49	Jornada 22	2020-01-17	6	4
50	Jornada 23	2020-01-17	6	4
51	Jornada 24	2020-01-17	6	4
52	Jornada 25	2020-01-17	6	4
53	Jornada 26	2020-01-17	6	4
54	Jornada 27	2020-01-17	6	4
55	Jornada 28	2020-01-17	6	4
56	Jornada 29	2020-01-17	6	4
57	Jornada 30	2020-01-17	6	4
58	Jornada 13	2020-01-20	3	4
59	Jornada 14	2020-01-27	3	4
60	Jornada 15	2020-02-02	3	4
61	Jornada 16	2020-02-10	3	4
62	Jornada 17	2020-02-17	3	4
63	Jornada 18	2020-03-06	3	4
64	Jornada 19	2020-03-08	3	4
\.


--
-- Data for Name: substitutions; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.substitutions (id, "playerIn", "playerOut", minute, "matchId", "userId", matchpart) FROM stdin;
5	3	4	7	10	4	25
6	5	6	7	10	4	25
7	8	9	7	10	4	25
8	6	10	10	10	4	25
9	6	4	7	15	4	29
10	7	2	7	15	4	29
11	10	9	7	15	4	29
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.teams (id, name, avatar, "signupDate", manager, season, competition, "userId") FROM stdin;
13	FUNDACIÓ CORNELLÀ "D"	assets/images/fcornella.png	2019-12-02 10:38:25+01	4	19/20	3	4
14	C.E.L'HOSPITALET "E"	assets/images/hospi.png	2019-12-02 15:17:22+01	\N	19/20	3	4
15	SANTBOIÀ "B"	assets/images/santboia.png	2019-12-02 15:18:42+01	\N	19/20	3	4
16	CAN BUXERES "B"	assets/images/canbu.png	2019-12-02 15:20:46+01	\N	19/20	3	4
17	E.F.GAVÀ "E"	assets/images/gava.png	2019-12-02 15:21:12+01	\N	19/20	3	4
18	ATLÈTIC SANT JUST "C"	assets/images/santjust.png	2019-12-02 16:11:40+01	\N	19/20	3	4
19	CAN VIDALET "B"	assets/images/canvi.png	2019-12-02 16:12:11+01	\N	19/20	3	4
20	ESPLUGUENC "A"	assets/images/espluguenc.png	2019-12-02 16:12:35+01	\N	19/20	3	4
21	CASTELLDEFELS "C"	assets/images/castelldefels.png	2019-12-02 16:12:57+01	\N	19/20	3	4
22	A.E.PRAT "B"	assets/images/aeprat.png	2019-12-02 16:13:26+01	\N	19/20	3	4
23	U.D.VILADECANS "B"	assets/images/viladecans.png	2019-12-02 16:13:54+01	\N	19/20	3	4
24	CIUDAD COOPERATIVA "A"	assets/images/coope.png	2019-12-02 16:14:12+01	\N	19/20	3	4
25	FUNDACIÓ EUROPA "B"	assets/images/fundeuropa.png	2019-12-02 16:15:28+01	\N	19/20	3	4
26	PUBILLA CASAS "A"	assets/images/pubilla.png	2019-12-02 16:15:47+01	\N	19/20	3	4
27	UNIFICACIÓN BELLVITGE "A"	assets/images/bellvitge.png	2019-12-02 16:16:11+01	\N	19/20	3	4
28	CUBELLES "D"	assets/images/cubelles.png	2019-12-02 16:16:27+01	\N	19/20	3	4
31	E.F. GAVÀ "B"	assets/images/gava.png	2020-01-17 12:40:43+01	4	18/19	6	4
32	F.C.BARCELONA "D"	assets/images/fcb.png	2020-01-17 15:22:50+01	\N	18/19	6	4
33	TERLENKA BARCELONISTA C.F. "A"	assets/images/terlenka.png	2020-01-17 15:23:23+01	\N	18/19	6	4
34	C.E.L'HOSPITALET "D"	assets/images/hospi.png	2020-01-17 15:24:38+01	\N	18/19	6	4
35	C.P.SARRIÀ "A"	assets/images/cp-sarria.png	2020-01-17 15:25:07+01	\N	18/19	6	4
36	MARTINENC "C"	assets/images/martinenc.png	2020-01-17 15:25:45+01	\N	18/19	6	4
37	P.B.ANGUERA "A"	assets/images/anguera.png	2020-01-17 15:26:17+01	\N	18/19	6	4
38	CAN BUXERES "A"	assets/images/canbu.png	2020-01-17 15:26:53+01	\N	18/19	6	4
39	CATALONIA "A"	assets/images/catalonia.png	2020-01-17 15:27:39+01	\N	18/19	6	4
40	P.B.COLLBLANC SANTS "A"	assets/images/collblanc.png	2020-01-17 15:27:58+01	\N	18/19	6	4
41	RACING SARRIÀ "A"	assets/images/racing.jpg	2020-01-17 15:28:30+01	\N	18/19	6	4
42	VILA OLÍMPICA "B"	assets/images/vila.png	2020-01-17 15:29:23+01	\N	18/19	6	4
43	CAN RULL RÓMULO TRONCHONI "A"	assets/images/canrull.png	2020-01-17 15:30:31+01	\N	18/19	6	4
44	C.E.EUROPA "B"	assets/images/ceeuropa.png	2020-01-17 15:31:03+01	\N	18/19	6	4
45	MATARÓ C.E. "C"	assets/images/mataro.png	2020-01-17 15:31:56+01	\N	18/19	6	4
49	ESPLUGUENC "A"	assets/images/espluguenc.png	2020-01-17 15:34:29+01	\N	18/19	6	4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.users (id, email, name, avatar, provider, provider_id, password, "signupDate", "lastLogin", role) FROM stdin;
5	cristian@gmail.com	Cristian	\N	local	\N	$2a$10$3dyoWvpMwsyvvmrNFTzTYuwHIYjv4ttxG3qquFCKumec9s5TOCLAm	2019-12-02 12:46:52+01	2019-12-13 16:07:55+01	user
1	admin@matchanalyzer.com	admin	\N	local	\N	$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.	2019-12-02 12:46:52+01	2020-05-30 19:05:38+02	admin
12	aa@a.aa	Manel Mendez	\N	local	\N	$2a$10$JJY4J/NKhtCyfki2PfoW0edjNIdGVvXm3UCE.CpwzAXR0beOEb.DO	2020-07-13 01:33:17.976+02	\N	user
14	aa@aa.aa	Manel Mendez	\N	local	\N	$2a$10$1zgk9N6woAiDRkrtEgCv/.FOXqnzNbOmo8w6ZRSmLWVfBPgC9egQ2	2020-07-13 01:35:17.833+02	\N	user
15	aaa@aa.aa	Manel Mendez	\N	local	\N	$2a$10$OehIr5e9OsPiKnWftnbvquuFToVh5Clre.lh0n45zkoLxyJn4u3v2	2020-07-13 01:36:33.111+02	2020-07-13 01:36:33.111+02	user
17	aaaa@aa.aa	Manel Mendez	\N	local	\N	$2a$10$cmV7OftCipDE2HBDX4jvUuDlkrAccloDsoudZjy4NHxLgSo9ofkIW	2020-07-15 18:54:43.285+02	2020-07-15 18:54:43.285+02	user
21	aaaa@aa.aaaa	Manel asMendez	\N	local	\N	$2a$10$y8gcRXoQDI9njdiwOxrZ7ue8daZq3keVF.xNQUrwS4nVjgioU2eB2	2020-07-15 20:00:09.308+02	2020-07-15 20:00:09.308+02	user
23	manelasd@gmail.com	\N	\N	local	\N	$2a$10$JsJVRqNU3DTGM3ebZuAMm.RHhPXvwWY18kBiNulN3s88iJi6IsObC	2020-07-15 20:03:34.417+02	2020-07-15 20:03:34.417+02	user
25	aaaa@aaa.aaaa	Manel asMendez	\N	local	\N	$2a$10$nWUEHPFk.HbuLercsAVRoerACKgzx2N8DA4sFynOhI5L2Wzd.eKLe	2020-07-15 20:04:02.969+02	2020-07-15 20:04:02.969+02	user
4	manel@gmail.com	Manel Méndez	\N	local	\N	$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.	2019-12-02 12:46:52+01	2020-08-04 02:58:57.579+02	user
\.


--
-- Name: assists_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.assists_id_seq', 1, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.cards_id_seq', 1, true);


--
-- Name: competitions_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.competitions_id_seq', 19, true);


--
-- Name: goals_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.goals_id_seq', 51, true);


--
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.matches_id_seq', 401, true);


--
-- Name: matchparts_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.matchparts_id_seq', 29, true);


--
-- Name: minutes_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.minutes_id_seq', 62, true);


--
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.players_id_seq', 21, true);


--
-- Name: rounds_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.rounds_id_seq', 64, true);


--
-- Name: substitutions_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.substitutions_id_seq', 11, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.teams_id_seq', 52, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.users_id_seq', 25, true);


--
-- Name: assists idx_16397_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT idx_16397_primary PRIMARY KEY (id);


--
-- Name: cards idx_16403_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT idx_16403_primary PRIMARY KEY (id);


--
-- Name: competitions idx_16411_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT idx_16411_primary PRIMARY KEY (id);


--
-- Name: goals idx_16418_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT idx_16418_primary PRIMARY KEY (id);


--
-- Name: matches idx_16426_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT idx_16426_primary PRIMARY KEY (id);


--
-- Name: matchparts idx_16432_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT idx_16432_primary PRIMARY KEY (id);


--
-- Name: minutes idx_16438_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT idx_16438_primary PRIMARY KEY (id);


--
-- Name: players idx_16444_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT idx_16444_primary PRIMARY KEY (id);


--
-- Name: rounds idx_16455_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT idx_16455_primary PRIMARY KEY (id);


--
-- Name: substitutions idx_16462_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT idx_16462_primary PRIMARY KEY (id);


--
-- Name: teams idx_16469_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT idx_16469_primary PRIMARY KEY (id);


--
-- Name: users idx_16480_primary; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.users
    ADD CONSTRAINT idx_16480_primary PRIMARY KEY (id);


--
-- Name: idx_16397_assist_goalid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16397_assist_goalid ON matchanalyzer.assists USING btree (goal);


--
-- Name: idx_16397_assist_match; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16397_assist_match ON matchanalyzer.assists USING btree ("matchId");


--
-- Name: idx_16397_assist_matchpart; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16397_assist_matchpart ON matchanalyzer.assists USING btree (matchpart);


--
-- Name: idx_16397_assist_playerid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16397_assist_playerid ON matchanalyzer.assists USING btree (player);


--
-- Name: idx_16397_assist_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16397_assist_userid ON matchanalyzer.assists USING btree ("userId");


--
-- Name: idx_16403_card_matchid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16403_card_matchid ON matchanalyzer.cards USING btree ("matchId");


--
-- Name: idx_16403_card_matchpartid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16403_card_matchpartid ON matchanalyzer.cards USING btree (matchpart);


--
-- Name: idx_16403_card_playerid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16403_card_playerid ON matchanalyzer.cards USING btree (player);


--
-- Name: idx_16403_card_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16403_card_userid ON matchanalyzer.cards USING btree ("userId");


--
-- Name: idx_16411_competition_managerid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16411_competition_managerid ON matchanalyzer.competitions USING btree (manager);


--
-- Name: idx_16411_competition_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16411_competition_userid ON matchanalyzer.competitions USING btree ("userId");


--
-- Name: idx_16411_name; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE UNIQUE INDEX idx_16411_name ON matchanalyzer.competitions USING btree (name);


--
-- Name: idx_16418_goal_matchid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16418_goal_matchid ON matchanalyzer.goals USING btree ("matchId");


--
-- Name: idx_16418_goal_matchpartid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16418_goal_matchpartid ON matchanalyzer.goals USING btree (matchpart);


--
-- Name: idx_16418_goal_playerid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16418_goal_playerid ON matchanalyzer.goals USING btree (player);


--
-- Name: idx_16418_goal_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16418_goal_userid ON matchanalyzer.goals USING btree ("userId");


--
-- Name: idx_16426_match_awayteamid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16426_match_awayteamid ON matchanalyzer.matches USING btree ("awayTeam");


--
-- Name: idx_16426_match_competitionid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16426_match_competitionid ON matchanalyzer.matches USING btree (competition);


--
-- Name: idx_16426_match_localteamid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16426_match_localteamid ON matchanalyzer.matches USING btree ("localTeam");


--
-- Name: idx_16426_match_roundid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16426_match_roundid ON matchanalyzer.matches USING btree (round);


--
-- Name: idx_16426_match_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16426_match_userid ON matchanalyzer.matches USING btree ("userId");


--
-- Name: idx_16432_matchpart_match; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16432_matchpart_match ON matchanalyzer.matchparts USING btree ("matchId");


--
-- Name: idx_16432_matchpart_team; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16432_matchpart_team ON matchanalyzer.matchparts USING btree (team);


--
-- Name: idx_16432_matchpart_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16432_matchpart_userid ON matchanalyzer.matchparts USING btree ("userId");


--
-- Name: idx_16438_minute_matchid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16438_minute_matchid ON matchanalyzer.minutes USING btree ("matchId");


--
-- Name: idx_16438_minute_matchpartid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16438_minute_matchpartid ON matchanalyzer.minutes USING btree (matchpart);


--
-- Name: idx_16438_minute_playerid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16438_minute_playerid ON matchanalyzer.minutes USING btree (player);


--
-- Name: idx_16438_minute_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16438_minute_userid ON matchanalyzer.minutes USING btree ("userId");


--
-- Name: idx_16444_player_teamid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16444_player_teamid ON matchanalyzer.players USING btree (team);


--
-- Name: idx_16444_player_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16444_player_userid ON matchanalyzer.players USING btree ("userId");


--
-- Name: idx_16455_round_competitionid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16455_round_competitionid ON matchanalyzer.rounds USING btree (competition);


--
-- Name: idx_16455_round_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16455_round_userid ON matchanalyzer.rounds USING btree ("userId");


--
-- Name: idx_16462_substitution_match; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16462_substitution_match ON matchanalyzer.substitutions USING btree ("matchId");


--
-- Name: idx_16462_substitution_matchpart; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16462_substitution_matchpart ON matchanalyzer.substitutions USING btree (matchpart);


--
-- Name: idx_16462_substitution_playerin; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16462_substitution_playerin ON matchanalyzer.substitutions USING btree ("playerIn");


--
-- Name: idx_16462_substitution_playerout; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16462_substitution_playerout ON matchanalyzer.substitutions USING btree ("playerOut");


--
-- Name: idx_16462_substitution_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16462_substitution_userid ON matchanalyzer.substitutions USING btree ("userId");


--
-- Name: idx_16469_team_competitionid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16469_team_competitionid ON matchanalyzer.teams USING btree (competition);


--
-- Name: idx_16469_team_userid; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX idx_16469_team_userid ON matchanalyzer.teams USING btree ("userId");


--
-- Name: idx_16480_email; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE UNIQUE INDEX idx_16480_email ON matchanalyzer.users USING btree (email);


--
-- Name: assists assist_goalid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_goalid FOREIGN KEY (goal) REFERENCES matchanalyzer.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_match; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_matchpart; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_matchpart FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_playerid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards card_matchid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_matchid FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards card_matchpartid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_matchpartid FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards card_playerid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cards card_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: competitions competition_managerid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT competition_managerid FOREIGN KEY (manager) REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: competitions competition_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT competition_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: goals goal_matchid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_matchid FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: goals goal_matchpartid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_matchpartid FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: goals goal_playerid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: goals goal_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matches match_awayteamid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_awayteamid FOREIGN KEY ("awayTeam") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: matches match_competitionid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_competitionid FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matches match_localteamid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_localteamid FOREIGN KEY ("localTeam") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: matches match_roundid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_roundid FOREIGN KEY (round) REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matches match_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matchparts matchpart_match; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matchparts matchpart_team; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_team FOREIGN KEY (team) REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matchparts matchpart_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_matchid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_matchid FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_matchpartid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_matchpartid FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_playerid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: players player_teamid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT player_teamid FOREIGN KEY (team) REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: players player_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT player_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rounds round_competitionid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT round_competitionid FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rounds round_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT round_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_match; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_matchpart; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_matchpart FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_playerin; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_playerin FOREIGN KEY ("playerIn") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_playerout; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_playerout FOREIGN KEY ("playerOut") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teams team_competitionid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT team_competitionid FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teams team_userid; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT team_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

