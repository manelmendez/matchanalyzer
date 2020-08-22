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

CREATE SCHEMA matchanalyzer;
ALTER SCHEMA matchanalyzer OWNER TO matchanalyzer;

CREATE TYPE matchanalyzer.users_role AS ENUM (
    'user',
    'admin'
);
ALTER TYPE matchanalyzer.users_role OWNER TO matchanalyzer;
SET default_tablespace = '';
SET default_table_access_method = heap;

CREATE TABLE matchanalyzer.assists (
    id bigint NOT NULL,
    type character varying(50),
    goal bigint,
    "matchId" bigint NOT NULL,
    matchpart bigint NOT NULL,
    player bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
);
ALTER TABLE matchanalyzer.assists OWNER TO matchanalyzer;
CREATE SEQUENCE matchanalyzer.assists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.assists_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.assists_id_seq OWNED BY matchanalyzer.assists.id;

CREATE TABLE matchanalyzer.cards (
    id bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint,
    type character varying(50) DEFAULT ''::character varying,
    "matchId" bigint NOT NULL,
    matchpart bigint NOT NULL,
    player bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
);
ALTER TABLE matchanalyzer.cards OWNER TO matchanalyzer;
CREATE SEQUENCE matchanalyzer.cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.cards_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.cards_id_seq OWNED BY matchanalyzer.cards.id;

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
CREATE SEQUENCE matchanalyzer.competitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.competitions_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.competitions_id_seq OWNED BY matchanalyzer.competitions.id;

CREATE TABLE matchanalyzer.goals (
    id bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint NOT NULL,
    type character varying(50) DEFAULT ''::character varying,
    "matchId" bigint NOT NULL,
    matchpart bigint NOT NULL,
    player bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
);
ALTER TABLE matchanalyzer.goals OWNER TO matchanalyzer;
CREATE SEQUENCE matchanalyzer.goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.goals_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.goals_id_seq OWNED BY matchanalyzer.goals.id;

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
CREATE SEQUENCE matchanalyzer.matches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.matches_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.matches_id_seq OWNED BY matchanalyzer.matches.id;

CREATE TABLE matchanalyzer.matchparts (
    id bigint NOT NULL,
    "matchId" bigint NOT NULL,
    formation character varying(50),
    "roundId" bigint NOT NULL,
    "time" bigint,
    team bigint NOT NULL,
    "userId" bigint NOT NULL
);
ALTER TABLE matchanalyzer.matchparts OWNER TO matchanalyzer;
CREATE SEQUENCE matchanalyzer.matchparts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.matchparts_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.matchparts_id_seq OWNED BY matchanalyzer.matchparts.id;

CREATE TABLE matchanalyzer.minutes (
    id bigint NOT NULL,
    "matchId" bigint NOT NULL,
    matchpart bigint NOT NULL,
    player bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    "position" character varying(50)
);
ALTER TABLE matchanalyzer.minutes OWNER TO matchanalyzer;
CREATE SEQUENCE matchanalyzer.minutes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.minutes_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.minutes_id_seq OWNED BY matchanalyzer.minutes.id;

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
CREATE SEQUENCE matchanalyzer.players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.players_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.players_id_seq OWNED BY matchanalyzer.players.id;

CREATE TABLE matchanalyzer.rounds (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    date date,
    competition bigint NOT NULL,
    "userId" bigint NOT NULL
);
ALTER TABLE matchanalyzer.rounds OWNER TO matchanalyzer;
CREATE SEQUENCE matchanalyzer.rounds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.rounds_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.rounds_id_seq OWNED BY matchanalyzer.rounds.id;

CREATE TABLE matchanalyzer.substitutions (
    id bigint NOT NULL,
    "playerIn" bigint NOT NULL,
    "playerOut" bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint,
    "matchId" bigint NOT NULL,
    matchpart bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
);
ALTER TABLE matchanalyzer.substitutions OWNER TO matchanalyzer;
CREATE SEQUENCE matchanalyzer.substitutions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.substitutions_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.substitutions_id_seq OWNED BY matchanalyzer.substitutions.id;

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
CREATE SEQUENCE matchanalyzer.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.teams_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.teams_id_seq OWNED BY matchanalyzer.teams.id;

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
CREATE SEQUENCE matchanalyzer.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE matchanalyzer.users_id_seq OWNER TO matchanalyzer;
ALTER SEQUENCE matchanalyzer.users_id_seq OWNED BY matchanalyzer.users.id;
ALTER TABLE ONLY matchanalyzer.assists ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.assists_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.cards ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.cards_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.competitions ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.competitions_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.goals ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.goals_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.matches ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.matches_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.matchparts ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.matchparts_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.minutes ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.minutes_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.players ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.players_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.rounds ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.rounds_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.substitutions ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.substitutions_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.teams ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.teams_id_seq'::regclass);
ALTER TABLE ONLY matchanalyzer.users ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.users_id_seq'::regclass);

COPY matchanalyzer.assists (id, type, goal, "matchId", matchpart, player, "roundId", "userId") FROM stdin;
\.
COPY matchanalyzer.cards (id, minute, type, player, "matchId", "userId", "roundId", matchpart) FROM stdin;
\.
COPY matchanalyzer.competitions (id, name, season, discipline, category, manager, "signupDate", "userId") FROM stdin;
3	2a División Grupo 5	19/20	F7	Alevín	2	2019-11-22 15:23:25+01	2
6	1a División Grupo 2	18/19	F7	Alevín	2	2020-01-17 12:41:28+01	2
\.
COPY matchanalyzer.goals (id, minute, type, player, "matchId", "roundId", "userId", matchpart) FROM stdin;
26	6	\N	10	10	13	2	22
27	9	\N	9	10	13	2	22
28	12	\N	9	10	13	2	22
29	10	\N	3	10	13	2	23
30	10	\N	6	10	13	2	24
31	7	\N	7	10	13	2	25
33	4	\N	9	15	14	2	26
34	8	\N	8	15	14	2	26
35	10	\N	10	15	14	2	26
36	12	\N	10	15	14	2	26
37	1	\N	7	15	14	2	27
38	10	\N	6	15	14	2	28
39	12	\N	5	15	14	2	28
40	14	\N	10	15	14	2	28
41	15	\N	6	15	14	2	28
42	15	\N	10	15	14	2	28
43	1	\N	9	15	14	2	29
44	2	\N	4	15	14	2	29
45	4	\N	4	15	14	2	29
46	6	\N	9	15	14	2	29
47	7	\N	8	15	14	2	29
48	9	\N	10	15	14	2	29
49	11	\N	8	15	14	2	29
51	13	\N	8	10	14	2	25
\.
COPY matchanalyzer.matches (id, "localTeam", "awayTeam", "matchDay", round, competition, "localTeamGoals", "awayTeamGoals", "userId") FROM stdin;
6	18	19	2019-12-03	13	3	4	5	2
7	20	21	2019-12-03	13	3	2	1	2
8	16	22	2019-12-03	13	3	12	5	2
9	27	17	2019-12-03	13	3	2	4	2
10	13	23	2019-12-03	13	3	8	0	2
11	24	28	2019-12-03	13	3	5	4	2
12	15	14	2019-12-03	13	3	1	5	2
13	22	20	2019-12-03	14	3	4	0	2
14	21	15	2019-12-03	14	3	4	6	2
15	28	13	2019-12-03	14	3	0	18	2
16	17	25	2019-12-03	14	3	6	2	2
17	23	16	2019-12-03	14	3	7	3	2
18	19	27	2019-12-03	14	3	5	2	2
19	26	24	2019-12-03	14	3	0	3	2
20	14	18	2019-12-03	14	3	3	2	2
21	20	23	2019-12-03	15	3	5	1	2
22	19	14	2019-12-03	15	3	1	2	2
23	18	21	2019-12-03	15	3	3	2	2
24	16	28	2019-12-03	15	3	15	0	2
25	24	17	2019-12-03	15	3	2	4	2
26	27	25	2019-12-03	15	3	1	2	2
27	13	26	2019-12-03	15	3	8	0	2
28	15	22	2019-12-03	15	3	4	3	2
29	22	18	2019-12-03	16	3	3	2	2
30	17	13	2019-12-03	16	3	0	8	2
31	28	20	2019-12-03	16	3	1	5	2
32	23	15	2019-12-03	16	3	2	0	2
33	21	19	2019-12-03	16	3	5	4	2
34	26	16	2019-12-03	16	3	3	4	2
35	14	27	2019-12-03	16	3	4	1	2
36	25	24	2019-12-03	16	3	5	1	2
37	20	26	2019-12-03	17	3	1	3	2
38	16	17	2019-12-03	17	3	4	4	2
39	14	21	2019-12-03	17	3	3	2	2
40	19	22	2019-12-03	17	3	5	7	2
41	27	24	2019-12-03	17	3	5	6	2
42	13	25	2019-12-03	17	3	6	0	2
43	15	28	2019-12-03	17	3	6	0	2
44	18	23	2019-12-03	17	3	3	0	2
45	22	14	2019-12-03	18	3	1	4	2
46	28	18	2019-12-03	18	3	0	8	2
47	23	19	2019-12-03	18	3	4	2	2
48	17	20	2019-12-03	18	3	3	2	2
49	26	15	2019-12-03	18	3	4	4	2
50	24	13	2019-12-03	18	3	0	13	2
51	25	16	2019-12-03	18	3	3	6	2
52	21	27	2019-12-03	18	3	4	3	2
53	15	17	2019-12-03	19	3	5	2	2
54	20	25	2019-12-03	19	3	6	2	2
55	21	22	2019-12-03	19	3	0	4	2
56	16	24	2019-12-03	19	3	2	3	2
57	18	26	2019-12-03	19	3	3	2	2
58	27	13	2019-12-03	19	3	2	6	2
59	14	23	2019-12-03	19	3	4	0	2
60	19	28	2019-12-03	19	3	6	0	2
61	25	15	2019-12-03	20	3	3	7	2
62	22	27	2019-12-03	20	3	2	3	2
63	23	21	2019-12-03	20	3	1	5	2
64	17	18	2019-12-03	20	3	2	1	2
65	26	19	2019-12-03	20	3	1	2	2
66	24	20	2019-12-03	20	3	1	3	2
67	28	14	2019-12-03	20	3	2	5	2
68	13	16	2019-12-03	20	3	6	2	2
69	22	23	2019-12-03	21	3	3	4	2
70	20	13	2019-12-03	21	3	0	7	2
71	18	25	2019-12-03	21	3	4	2	2
72	21	28	2019-12-03	21	3	9	0	2
73	19	17	2019-12-03	21	3	3	2	2
74	27	16	2019-12-03	21	3	2	3	2
75	14	26	2019-12-03	21	3	4	1	2
76	15	24	2019-12-03	21	3	7	5	2
77	25	19	2019-12-14	22	3	7	4	2
78	28	22	2019-12-14	22	3	4	5	2
79	16	20	2019-12-14	22	3	1	0	2
80	17	14	2019-12-14	22	3	1	1	2
81	26	21	2019-12-14	22	3	2	3	2
82	24	18	2019-12-14	22	3	4	5	2
83	23	27	2019-12-16	22	3	2	3	2
84	13	15	2019-12-16	22	3	10	4	2
85	18	13	2019-12-21	23	3	2	5	2
86	19	24	2019-12-21	23	3	4	1	2
87	22	26	2019-12-21	23	3	5	2	2
88	23	28	2019-12-21	23	3	4	1	2
89	15	16	2019-12-21	23	3	1	5	2
90	27	20	2019-12-21	23	3	3	1	2
91	14	25	2019-12-21	23	3	1	3	2
96	21	17	2019-12-31	23	3	1	5	2
97	20	15	2020-01-11	25	3	2	6	2
98	25	21	2020-01-11	25	3	1	1	2
99	28	27	2020-01-11	25	3	0	9	2
100	16	18	2020-01-11	25	3	4	1	2
101	17	22	2020-01-11	25	3	2	5	2
102	26	23	2020-01-11	25	3	2	1	2
103	24	14	2020-01-11	25	3	2	5	2
104	13	19	2020-01-11	25	3	12	0	2
105	41	31	2020-01-17	28	6	1	9	2
106	32	43	2020-01-17	28	6	16	1	2
107	44	42	2020-01-17	28	6	2	2	2
108	38	45	2020-01-17	28	6	6	3	2
109	33	34	2020-01-17	28	6	6	7	2
110	35	39	2020-01-17	28	6	8	6	2
111	36	37	2020-01-17	28	6	2	2	2
112	49	40	2020-01-17	28	6	2	6	2
113	34	36	2020-01-17	29	6	2	2	2
114	31	49	2020-01-17	29	6	10	0	2
115	37	35	2020-01-17	29	6	2	2	2
116	45	33	2020-01-17	29	6	2	4	2
117	39	44	2020-01-17	29	6	1	6	2
118	40	38	2020-01-17	29	6	3	5	2
119	43	41	2020-01-17	29	6	1	6	2
120	42	32	2020-01-17	29	6	0	10	2
121	32	39	2020-01-17	30	6	12	1	2
122	38	31	2020-01-17	30	6	5	4	2
123	33	36	2020-01-17	30	6	6	3	2
124	35	34	2020-01-17	30	6	5	1	2
125	41	42	2020-01-17	30	6	1	3	2
126	49	43	2020-01-17	30	6	3	2	2
127	44	37	2020-01-17	30	6	1	1	2
128	45	40	2020-01-17	30	6	5	4	2
129	39	41	2020-01-17	31	6	5	2	2
130	31	45	2020-01-17	31	6	9	0	2
131	36	35	2020-01-17	31	6	2	5	2
132	43	38	2020-01-17	31	6	3	3	2
133	40	33	2020-01-17	31	6	2	10	2
134	34	44	2020-01-17	31	6	7	2	2
135	42	49	2020-01-17	31	6	7	2	2
136	37	32	2020-01-17	31	6	0	7	2
137	41	37	2020-01-17	32	6	8	3	2
138	38	42	2020-01-17	32	6	6	0	2
139	44	36	2020-01-17	32	6	4	4	2
140	40	31	2020-01-17	32	6	3	7	2
141	33	35	2020-01-17	32	6	3	3	2
142	32	34	2020-01-17	32	6	1	2	2
143	45	43	2020-01-17	32	6	4	3	2
144	49	39	2020-01-17	32	6	2	2	2
145	43	40	2020-01-17	33	6	9	1	2
146	36	32	2020-01-17	33	6	0	13	2
147	31	33	2020-01-17	33	6	3	3	2
148	34	41	2020-01-17	33	6	6	5	2
149	35	44	2020-01-17	33	6	3	1	2
150	39	38	2020-01-17	33	6	1	2	2
151	37	49	2020-01-17	33	6	11	1	2
152	42	45	2020-01-17	33	6	6	2	2
153	49	34	2020-01-17	34	6	2	4	2
154	41	36	2020-01-17	34	6	2	5	2
155	31	43	2020-01-17	34	6	7	0	2
156	38	37	2020-01-17	34	6	6	2	2
157	32	35	2020-01-17	34	6	5	0	2
158	33	44	2020-01-17	34	6	5	2	2
159	40	42	2020-01-17	34	6	1	3	2
160	45	39	2020-01-17	34	6	4	3	2
161	36	49	2020-01-17	35	6	8	2	2
162	37	45	2020-01-17	35	6	4	3	2
163	35	41	2020-01-17	35	6	5	2	2
164	39	40	2020-01-17	35	6	1	1	2
165	43	33	2020-01-17	35	6	0	8	2
166	42	31	2020-01-17	35	6	3	3	2
167	44	32	2020-01-17	35	6	1	6	2
168	34	38	2020-01-17	35	6	3	0	2
169	31	39	2020-01-17	36	6	4	1	2
170	41	44	2020-01-17	36	6	1	1	2
171	38	36	2020-01-17	36	6	2	0	2
172	40	37	2020-01-17	36	6	4	1	2
173	43	42	2020-01-17	36	6	1	6	2
174	49	35	2020-01-17	36	6	1	4	2
175	45	34	2020-01-17	36	6	2	2	2
176	33	32	2020-01-17	36	6	3	5	2
177	39	43	2020-01-17	37	6	7	1	2
178	37	31	2020-01-17	37	6	3	7	2
179	32	41	2020-01-17	37	6	10	2	2
180	36	45	2020-01-17	37	6	5	1	2
181	35	38	2020-01-17	37	6	2	3	2
182	34	40	2020-01-17	37	6	8	0	2
183	44	49	2020-01-17	37	6	3	2	2
184	42	33	2020-01-17	37	6	0	6	2
185	42	39	2020-01-17	38	6	2	4	2
186	31	34	2020-01-17	38	6	3	1	2
187	45	35	2020-01-17	38	6	0	1	2
188	38	44	2020-01-17	38	6	3	2	2
189	40	36	2020-01-17	38	6	2	4	2
190	43	37	2020-01-17	38	6	0	5	2
191	49	32	2020-01-17	38	6	1	18	2
192	33	41	2020-01-17	38	6	3	1	2
193	41	49	2020-01-17	39	6	8	5	2
194	36	31	2020-01-17	39	6	3	4	2
195	32	38	2020-01-17	39	6	12	0	2
196	35	40	2020-01-17	39	6	6	0	2
197	39	33	2020-01-17	39	6	0	5	2
198	44	45	2020-01-17	39	6	1	1	2
199	37	42	2020-01-17	39	6	3	2	2
200	34	43	2020-01-17	39	6	7	2	2
201	45	32	2020-01-17	40	6	1	12	2
202	31	35	2020-01-17	40	6	3	1	2
203	38	41	2020-01-17	40	6	3	1	2
204	33	49	2020-01-17	40	6	7	1	2
205	40	44	2020-01-17	40	6	2	2	2
206	43	36	2020-01-17	40	6	3	2	2
207	39	37	2020-01-17	40	6	0	4	2
208	42	34	2020-01-17	40	6	2	6	2
209	41	45	2020-01-17	41	6	10	3	2
210	49	38	2020-01-17	41	6	1	6	2
211	36	42	2020-01-17	41	6	7	2	2
212	33	37	2020-01-17	41	6	4	1	2
213	35	43	2020-01-17	41	6	7	6	2
214	32	40	2020-01-17	41	6	18	1	2
215	34	39	2020-01-17	41	6	9	2	2
216	44	31	2020-01-17	41	6	1	6	2
217	42	35	2020-01-17	42	6	0	6	2
218	38	33	2020-01-17	42	6	2	3	2
219	45	49	2020-01-17	42	6	4	4	2
220	31	32	2020-01-17	42	6	2	3	2
221	39	36	2020-01-17	42	6	1	2	2
222	43	44	2020-01-17	42	6	3	2	2
223	40	41	2020-01-17	42	6	6	5	2
224	37	34	2020-01-17	42	6	5	0	2
225	39	35	2020-01-17	43	6	3	2	2
226	31	41	2020-01-17	43	6	7	1	2
227	43	32	2020-01-17	43	6	1	11	2
228	45	38	2020-01-17	43	6	2	3	2
229	34	33	2020-01-17	43	6	1	2	2
230	40	49	2020-01-17	43	6	2	0	2
231	42	44	2020-01-17	43	6	2	2	2
232	37	36	2020-01-17	43	6	4	3	2
233	41	43	2020-01-17	44	6	3	6	2
234	32	42	2020-01-17	44	6	12	1	2
235	38	40	2020-01-17	44	6	9	0	2
236	33	45	2020-01-17	44	6	7	0	2
237	44	39	2020-01-17	44	6	2	2	2
238	35	37	2020-01-17	44	6	3	1	2
239	36	34	2020-01-17	44	6	0	3	2
240	49	31	2020-01-17	44	6	2	2	2
241	39	32	2020-01-17	45	6	3	7	2
242	34	35	2020-01-17	45	6	5	2	2
243	36	33	2020-01-17	45	6	1	2	2
244	43	49	2020-01-17	45	6	6	3	2
245	31	38	2020-01-17	45	6	4	2	2
246	40	45	2020-01-17	45	6	4	0	2
247	42	41	2020-01-17	45	6	5	4	2
248	37	44	2020-01-17	45	6	2	0	2
249	41	39	2020-01-17	46	6	4	1	2
250	32	37	2020-01-17	46	6	7	1	2
251	33	40	2020-01-17	46	6	13	0	2
252	45	31	2020-01-17	46	6	4	6	2
253	38	43	2020-01-17	46	6	7	1	2
254	35	36	2020-01-17	46	6	5	4	2
255	49	42	2020-01-17	46	6	2	4	2
256	44	34	2020-01-17	46	6	5	1	2
257	31	40	2020-01-17	47	6	8	0	2
258	43	45	2020-01-17	47	6	6	5	2
259	39	49	2020-01-17	47	6	9	1	2
260	36	44	2020-01-17	47	6	5	2	2
261	42	38	2020-01-17	47	6	1	7	2
262	37	41	2020-01-17	47	6	6	0	2
263	35	33	2020-01-17	47	6	5	5	2
264	34	32	2020-01-17	47	6	1	10	2
265	41	34	2020-01-17	48	6	1	2	2
266	33	31	2020-01-17	48	6	7	2	2
267	32	36	2020-01-17	48	6	8	0	2
268	49	37	2020-01-17	48	6	1	7	2
269	38	39	2020-01-17	48	6	2	2	2
270	45	42	2020-01-17	48	6	1	4	2
271	40	43	2020-01-17	48	6	3	3	2
272	44	35	2020-01-17	48	6	1	3	2
273	39	45	2020-01-17	49	6	6	4	2
274	36	41	2020-01-17	49	6	4	1	2
275	43	31	2020-01-17	49	6	1	6	2
276	44	33	2020-01-17	49	6	0	1	2
277	37	38	2020-01-17	49	6	0	4	2
278	42	40	2020-01-17	49	6	2	5	2
279	35	32	2020-01-17	49	6	2	2	2
280	34	49	2020-01-17	49	6	16	5	2
281	41	35	2020-01-17	50	6	4	3	2
282	32	44	2020-01-17	50	6	7	0	2
283	31	42	2020-01-17	50	6	7	2	2
284	40	39	2020-01-17	50	6	5	5	2
285	33	43	2020-01-17	50	6	10	0	2
286	38	34	2020-01-17	50	6	4	3	2
287	49	36	2020-01-17	50	6	2	6	2
288	45	37	2020-01-17	50	6	2	2	2
289	37	40	2020-01-17	51	6	3	3	2
290	44	41	2020-01-17	51	6	1	2	2
291	35	49	2020-01-17	51	6	7	3	2
292	39	31	2020-01-17	51	6	2	7	2
293	36	38	2020-01-17	51	6	1	3	2
294	42	43	2020-01-17	51	6	2	5	2
295	32	33	2020-01-17	51	6	6	2	2
296	34	45	2020-01-17	51	6	7	3	2
297	49	44	2020-01-17	52	6	2	10	2
298	41	32	2020-01-17	52	6	2	11	2
299	45	36	2020-01-17	52	6	2	1	2
300	31	37	2020-01-17	52	6	4	2	2
301	40	34	2020-01-17	52	6	5	4	2
302	43	39	2020-01-17	52	6	4	4	2
303	33	42	2020-01-17	52	6	7	1	2
304	38	35	2020-01-17	52	6	5	2	2
305	39	42	2020-01-17	53	6	3	0	2
306	41	33	2020-01-17	53	6	3	5	2
307	32	49	2020-01-17	53	6	18	0	2
308	44	38	2020-01-17	53	6	1	4	2
309	35	45	2020-01-17	53	6	12	1	2
310	36	40	2020-01-17	53	6	5	2	2
311	37	43	2020-01-17	53	6	5	4	2
312	34	31	2020-01-17	53	6	6	4	2
313	45	44	2020-01-17	54	6	2	2	2
314	33	39	2020-01-17	54	6	1	0	2
315	31	36	2020-01-17	54	6	4	0	2
316	42	37	2020-01-17	54	6	1	3	2
317	38	32	2020-01-17	54	6	2	3	2
318	43	34	2020-01-17	54	6	1	5	2
319	40	35	2020-01-17	54	6	2	4	2
320	49	41	2020-01-17	54	6	4	9	2
321	41	38	2020-01-17	55	6	2	7	2
322	49	33	2020-01-17	55	6	0	11	2
323	44	40	2020-01-17	55	6	9	3	2
324	32	45	2020-01-17	55	6	11	0	2
325	35	31	2020-01-17	55	6	1	7	2
326	36	43	2020-01-17	55	6	3	2	2
327	37	39	2020-01-17	55	6	2	6	2
328	34	42	2020-01-17	55	6	6	1	2
329	38	49	2020-01-17	56	6	16	0	2
330	43	35	2020-01-17	56	6	3	3	2
331	31	44	2020-01-17	56	6	4	1	2
332	39	34	2020-01-17	56	6	4	8	2
333	40	32	2020-01-17	56	6	1	16	2
334	42	36	2020-01-17	56	6	3	5	2
335	45	41	2020-01-17	56	6	2	7	2
336	37	33	2020-01-17	56	6	0	5	2
337	41	40	2020-01-17	57	6	4	6	2
338	32	31	2020-01-17	57	6	2	3	2
339	36	39	2020-01-17	57	6	4	3	2
340	34	37	2020-01-17	57	6	10	0	2
341	33	38	2020-01-17	57	6	4	2	2
342	49	45	2020-01-17	57	6	5	2	2
343	35	42	2020-01-17	57	6	7	1	2
344	44	43	2020-01-17	57	6	3	3	2
345	18	20	2020-01-20	58	3	3	2	2
346	21	24	2020-01-20	58	3	11	2	2
347	23	17	2020-01-20	58	3	1	3	2
348	27	15	2020-01-20	58	3	3	8	2
349	14	13	2020-01-20	58	3	0	2	2
350	19	16	2020-01-20	58	3	4	5	2
351	28	26	2020-01-20	58	3	2	2	2
352	17	28	2020-01-27	59	3	13	1	2
353	20	19	2020-01-27	59	3	2	1	2
354	25	23	2020-01-27	59	3	3	0	2
355	15	18	2020-01-27	59	3	3	5	2
356	16	14	2020-01-27	59	3	4	8	2
357	27	26	2020-01-27	59	3	3	2	2
358	24	22	2020-01-27	59	3	2	2	2
359	13	21	2020-01-27	59	3	7	0	2
360	22	25	2020-01-30	58	3	1	3	2
361	22	13	2020-02-02	60	3	0	9	2
362	18	27	2020-02-02	60	3	6	0	2
363	23	24	2020-02-02	60	3	1	6	2
364	21	16	2020-02-02	60	3	6	3	2
365	28	25	2020-02-02	60	3	0	6	2
366	26	17	2020-02-02	60	3	7	1	2
367	14	20	2020-02-02	60	3	3	1	2
368	19	15	2020-02-03	60	3	1	3	2
369	22	16	2020-02-10	61	3	3	6	2
370	17	27	2020-02-10	61	3	5	0	2
371	23	13	2020-02-10	61	3	1	9	2
372	21	20	2020-02-10	61	3	4	4	2
373	28	24	2020-02-10	61	3	0	6	2
374	26	25	2020-02-10	61	3	1	0	2
375	14	15	2020-02-10	61	3	3	2	2
376	19	18	2020-02-10	61	3	2	2	2
377	20	22	2020-02-17	62	3	1	1	2
378	16	23	2020-02-17	62	3	3	0	2
379	15	21	2020-02-17	62	3	5	3	2
380	25	17	2020-02-17	62	3	1	3	2
381	24	26	2020-02-17	62	3	1	3	2
382	27	19	2020-02-17	62	3	0	1	2
383	13	28	2020-02-17	62	3	20	0	2
384	18	14	2020-02-17	62	3	0	6	2
385	22	15	2020-03-06	63	3	4	2	2
386	25	27	2020-03-06	63	3	2	2	2
387	23	20	2020-03-06	63	3	2	10	2
388	28	16	2020-03-06	63	3	0	6	2
389	21	18	2020-03-06	63	3	3	4	2
390	17	24	2020-03-06	63	3	3	1	2
391	14	19	2020-03-06	63	3	13	2	2
392	26	13	2020-03-06	63	3	2	5	2
393	19	21	2020-03-08	64	3	2	4	2
394	15	23	2020-03-08	64	3	6	0	2
395	16	26	2020-03-08	64	3	3	6	2
396	27	14	2020-03-08	64	3	4	7	2
397	18	22	2020-03-08	64	3	4	3	2
398	24	25	2020-03-08	64	3	1	6	2
399	20	28	2020-03-08	64	3	6	1	2
400	13	17	2020-03-08	64	3	9	0	2
401	25	26	2020-03-14	13	3	5	3	2
\.
COPY matchanalyzer.matchparts (id, "matchId", formation, "time", team, "roundId", "userId") FROM stdin;
22	10	3-1-2	15	13	13	2
23	10	3-1-2	15	13	13	2
24	10	3-1-2	15	13	13	2
25	10	3-1-2	15	13	13	2
26	15	3-1-2	15	13	14	2
27	15	3-1-2	15	13	14	2
28	15	3-1-2	15	13	14	2
29	15	3-1-2	15	13	14	2
\.
COPY matchanalyzer.minutes (id, player, matchpart, "matchId", "roundId", "userId", "position") FROM stdin;
2	1	22	10	13	2	PT
3	2	22	10	13	2	CT
4	4	22	10	13	2	LD
5	6	22	10	13	2	LI
6	7	22	10	13	2	MC
7	10	22	10	13	2	DC
12	9	22	10	13	2	DC
13	1	23	10	13	2	PT
14	2	23	10	13	2	CT
15	3	23	10	13	2	LD
16	5	23	10	13	2	LI
17	8	23	10	13	2	MC
18	9	23	10	13	2	DC
19	10	23	10	13	2	DC
20	1	24	10	13	2	PT
22	3	24	10	13	2	CT
23	4	24	10	13	2	LD
24	5	24	10	13	2	LI
25	7	24	10	13	2	MC
26	6	24	10	13	2	DC
27	8	24	10	13	2	DC
28	1	25	10	13	2	PT
29	2	25	10	13	2	CT
30	4	25	10	13	2	LD
31	6	25	10	13	2	LI
32	7	25	10	13	2	MC
33	10	25	10	13	2	DC
34	9	25	10	13	2	DC
35	1	26	15	14	2	PT
36	3	26	15	14	2	CT
37	4	26	15	14	2	LD
38	5	26	15	14	2	LI
39	8	26	15	14	2	MC
40	9	26	15	14	2	DC
41	10	26	15	14	2	DC
42	1	27	15	14	2	PT
43	2	27	15	14	2	CT
44	3	27	15	14	2	LD
45	6	27	15	14	2	LI
46	7	27	15	14	2	MC
47	9	27	15	14	2	DC
48	8	27	15	14	2	DC
49	1	28	15	14	2	PT
50	2	28	15	14	2	CT
51	4	28	15	14	2	LD
52	5	28	15	14	2	LI
53	7	28	15	14	2	MC
54	6	28	15	14	2	DC
55	10	28	15	14	2	DC
56	1	29	15	14	2	PT
57	3	29	15	14	2	CT
58	4	29	15	14	2	LD
59	5	29	15	14	2	LI
60	2	29	15	14	2	MC
61	8	29	15	14	2	DC
62	9	29	15	14	2	DC
\.
COPY matchanalyzer.players (id, name, avatar, year, team, "position", "userId") FROM stdin;
1	Pau Sabio	assets/images/person_icon.png	2009	13	PT	2
2	Adrián Cuadrado	assets/images/person_icon.png	2009	13	CT	2
3	Vadym Bilanchyk	assets/images/person_icon.png	2009	13	CT	2
4	Marc Morilla	assets/images/person_icon.png	2009	13	LD	2
5	Luc Gironès	assets/images/person_icon.png	2009	13	LI	2
6	Pol Moreno	assets/images/person_icon.png	2009	13	LD	2
7	Alfredo Tiffón	assets/images/person_icon.png	2009	13	MC	2
8	Roberto Tomás	assets/images/person_icon.png	2009	13	MP	2
9	Taemin Noh	assets/images/person_icon.png	2009	13	DC	2
10	Welson Jiménez	assets/images/person_icon.png	2009	13	DC	2
13	Michele Grondona	assets/images/person_icon.png	2007	31	CT	2
15	Andrés Torres Castellarnau	assets/images/person_icon.png	2007	31	LD	2
16	Natxo Montero Raya	assets/images/person_icon.png	2007	31	LI	2
21	Alejandro Santiago Vargas	assets/images/person_icon.png	2007	31	DC	2
12	David Lloret Montes	\N	2007	31	PT	2
14	Álex Carrillo Espejo	\N	2007	31	LD	2
18	Germán Guillén Sala	\N	2007	31	MC	2
17	Xavi Pérez Molinero	\N	2007	31	MCD	2
20	Hugo Recio Punzano	\N	2007	31	DC	2
19	Pol Mora Cañete	\N	2007	31	MP	2
11	Daniel Oliva Bermúdez	\N	2007	31	PT	2
\.
COPY matchanalyzer.rounds (id, name, date, competition, "userId") FROM stdin;
13	Jornada 1	2019-12-03	3	2
14	Jornada 2	2019-12-03	3	2
15	Jornada 3	2019-12-03	3	2
16	Jornada 4	2019-12-03	3	2
17	Jornada 5	2019-12-03	3	2
18	Jornada 6	2019-12-03	3	2
19	Jornada 7	2019-12-03	3	2
20	Jornada 8	2019-12-03	3	2
21	Jornada 9	2019-12-03	3	2
22	Jornada 10	2019-12-14	3	2
23	Jornada 11	2019-12-21	3	2
25	Jornada 12	2020-01-11	3	2
28	Jornada 1	2020-01-17	6	2
29	Jornada 2	2020-01-17	6	2
30	Jornada 3	2020-01-17	6	2
31	Jornada 4	2020-01-17	6	2
32	Jornada 5	2020-01-17	6	2
33	Jornada 6	2020-01-17	6	2
34	Jornada 7	2020-01-17	6	2
35	Jornada 8	2020-01-17	6	2
36	Jornada 9	2020-01-17	6	2
37	Jornada 10	2020-01-17	6	2
38	Jornada 11	2020-01-17	6	2
39	Jornada 12	2020-01-17	6	2
40	Jornada 13	2020-01-17	6	2
41	Jornada 14	2020-01-17	6	2
42	Jornada 15	2020-01-17	6	2
43	Jornada 16	2020-01-17	6	2
44	Jornada 17	2020-01-17	6	2
45	Jornada 18	2020-01-17	6	2
46	Jornada 19	2020-01-17	6	2
47	Jornada 20	2020-01-17	6	2
48	Jornada 21	2020-01-17	6	2
49	Jornada 22	2020-01-17	6	2
50	Jornada 23	2020-01-17	6	2
51	Jornada 24	2020-01-17	6	2
52	Jornada 25	2020-01-17	6	2
53	Jornada 26	2020-01-17	6	2
54	Jornada 27	2020-01-17	6	2
55	Jornada 28	2020-01-17	6	2
56	Jornada 29	2020-01-17	6	2
57	Jornada 30	2020-01-17	6	2
58	Jornada 13	2020-01-20	3	2
59	Jornada 14	2020-01-27	3	2
60	Jornada 15	2020-02-02	3	2
61	Jornada 16	2020-02-10	3	2
62	Jornada 17	2020-02-17	3	2
63	Jornada 18	2020-03-06	3	2
64	Jornada 19	2020-03-08	3	2
\.
COPY matchanalyzer.substitutions (id, "playerIn", "playerOut", minute, "matchId", "roundId", "userId", matchpart) FROM stdin;
5	3	4	7	10	13	2	25
6	5	6	7	10	13	2	25
7	8	9	7	10	13	2	25
8	6	10	10	10	13	2	25
9	6	4	7	15	14	2	29
10	7	2	7	15	14	2	29
11	10	9	7	15	14	2	29
\.
COPY matchanalyzer.teams (id, name, avatar, "signupDate", manager, season, competition, "userId") FROM stdin;
13	FUNDACIÓ CORNELLÀ "D"	assets/images/fcornella.png	2019-12-02 10:38:25+01	2	19/20	3	2
14	C.E.L'HOSPITALET "E"	assets/images/hospi.png	2019-12-02 15:17:22+01	\N	19/20	3	2
15	SANTBOIÀ "B"	assets/images/santboia.png	2019-12-02 15:18:42+01	\N	19/20	3	2
16	CAN BUXERES "B"	assets/images/canbu.png	2019-12-02 15:20:46+01	\N	19/20	3	2
17	E.F.GAVÀ "E"	assets/images/gava.png	2019-12-02 15:21:12+01	\N	19/20	3	2
18	ATLÈTIC SANT JUST "C"	assets/images/santjust.png	2019-12-02 16:11:40+01	\N	19/20	3	2
19	CAN VIDALET "B"	assets/images/canvi.png	2019-12-02 16:12:11+01	\N	19/20	3	2
20	ESPLUGUENC "A"	assets/images/espluguenc.png	2019-12-02 16:12:35+01	\N	19/20	3	2
21	CASTELLDEFELS "C"	assets/images/castelldefels.png	2019-12-02 16:12:57+01	\N	19/20	3	2
22	A.E.PRAT "B"	assets/images/aeprat.png	2019-12-02 16:13:26+01	\N	19/20	3	2
23	U.D.VILADECANS "B"	assets/images/viladecans.png	2019-12-02 16:13:54+01	\N	19/20	3	2
24	CIUDAD COOPERATIVA "A"	assets/images/coope.png	2019-12-02 16:14:12+01	\N	19/20	3	2
25	FUNDACIÓ EUROPA "B"	assets/images/fundeuropa.png	2019-12-02 16:15:28+01	\N	19/20	3	2
26	PUBILLA CASAS "A"	assets/images/pubilla.png	2019-12-02 16:15:47+01	\N	19/20	3	2
27	UNIFICACIÓN BELLVITGE "A"	assets/images/bellvitge.png	2019-12-02 16:16:11+01	\N	19/20	3	2
28	CUBELLES "D"	assets/images/cubelles.png	2019-12-02 16:16:27+01	\N	19/20	3	2
31	E.F. GAVÀ "B"	assets/images/gava.png	2020-01-17 12:40:43+01	2	18/19	6	2
32	F.C.BARCELONA "D"	assets/images/fcb.png	2020-01-17 15:22:50+01	\N	18/19	6	2
33	TERLENKA BARCELONISTA C.F. "A"	assets/images/terlenka.png	2020-01-17 15:23:23+01	\N	18/19	6	2
34	C.E.L'HOSPITALET "D"	assets/images/hospi.png	2020-01-17 15:24:38+01	\N	18/19	6	2
35	C.P.SARRIÀ "A"	assets/images/cp-sarria.png	2020-01-17 15:25:07+01	\N	18/19	6	2
36	MARTINENC "C"	assets/images/martinenc.png	2020-01-17 15:25:45+01	\N	18/19	6	2
37	P.B.ANGUERA "A"	assets/images/anguera.png	2020-01-17 15:26:17+01	\N	18/19	6	2
38	CAN BUXERES "A"	assets/images/canbu.png	2020-01-17 15:26:53+01	\N	18/19	6	2
39	CATALONIA "A"	assets/images/catalonia.png	2020-01-17 15:27:39+01	\N	18/19	6	2
40	P.B.COLLBLANC SANTS "A"	assets/images/collblanc.png	2020-01-17 15:27:58+01	\N	18/19	6	2
41	RACING SARRIÀ "A"	assets/images/racing.jpg	2020-01-17 15:28:30+01	\N	18/19	6	2
42	VILA OLÍMPICA "B"	assets/images/vila.png	2020-01-17 15:29:23+01	\N	18/19	6	2
43	CAN RULL RÓMULO TRONCHONI "A"	assets/images/canrull.png	2020-01-17 15:30:31+01	\N	18/19	6	2
44	C.E.EUROPA "B"	assets/images/ceeuropa.png	2020-01-17 15:31:03+01	\N	18/19	6	2
45	MATARÓ C.E. "C"	assets/images/mataro.png	2020-01-17 15:31:56+01	\N	18/19	6	2
49	ESPLUGUENC "A"	assets/images/espluguenc.png	2020-01-17 15:34:29+01	\N	18/19	6	2
\.
COPY matchanalyzer.users (id, email, name, avatar, provider, provider_id, password, "signupDate", "lastLogin", role) FROM stdin;
1	admin@matchanalyzer.com	admin	\N	local	\N	$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.	2019-12-02 12:46:52+01	2020-05-30 19:05:38+02	admin
2	manel@gmail.com	Manel Méndez	\N	local	\N	$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.	2019-12-02 12:46:52+01	2020-08-04 02:58:57.579+02	user
\.

SELECT pg_catalog.setval('matchanalyzer.cards_id_seq', 1, true);
SELECT pg_catalog.setval('matchanalyzer.competitions_id_seq', 19, true);
SELECT pg_catalog.setval('matchanalyzer.goals_id_seq', 51, true);
SELECT pg_catalog.setval('matchanalyzer.matches_id_seq', 401, true);
SELECT pg_catalog.setval('matchanalyzer.matchparts_id_seq', 29, true);
SELECT pg_catalog.setval('matchanalyzer.minutes_id_seq', 62, true);
SELECT pg_catalog.setval('matchanalyzer.players_id_seq', 21, true);
SELECT pg_catalog.setval('matchanalyzer.rounds_id_seq', 64, true);
SELECT pg_catalog.setval('matchanalyzer.substitutions_id_seq', 11, true);
SELECT pg_catalog.setval('matchanalyzer.teams_id_seq', 52, true);
SELECT pg_catalog.setval('matchanalyzer.users_id_seq', 2, true);

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT idx_16397_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT idx_16403_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT idx_16411_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT idx_16418_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT idx_16426_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT idx_16432_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT idx_16438_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT idx_16444_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT idx_16455_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT idx_16462_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT idx_16469_primary PRIMARY KEY (id);
ALTER TABLE ONLY matchanalyzer.users
    ADD CONSTRAINT idx_16480_primary PRIMARY KEY (id);

CREATE INDEX "fki_assist_goalId" ON matchanalyzer.assists USING btree (goal);
CREATE INDEX "fki_assist_match" ON matchanalyzer.assists USING btree ("matchId");
CREATE INDEX "fki_assist_matchpart" ON matchanalyzer.assists USING btree (matchpart);
CREATE INDEX "fki_assist_playerId" ON matchanalyzer.assists USING btree (player);
CREATE INDEX "fki_assist_roundId" ON matchanalyzer.assists USING btree ("roundId");
CREATE INDEX "fki_assist_userId" ON matchanalyzer.assists USING btree ("userId");
CREATE INDEX "fki_card_matchId" ON matchanalyzer.cards USING btree ("matchId");
CREATE INDEX "fki_card_matchpartId" ON matchanalyzer.cards USING btree (matchpart);
CREATE INDEX "fki_card_playerId" ON matchanalyzer.cards USING btree (player);
CREATE INDEX "fki_card_roundId" ON matchanalyzer.cards USING btree ("roundId");
CREATE INDEX "fki_card_userId" ON matchanalyzer.cards USING btree ("userId");
CREATE INDEX "fki_competition_managerId" ON matchanalyzer.competitions USING btree (manager);
CREATE INDEX "fki_competition_userId" ON matchanalyzer.competitions USING btree ("userId");
CREATE UNIQUE INDEX idx_16411_name ON matchanalyzer.competitions USING btree (name);
CREATE INDEX "fki_goal_matchId" ON matchanalyzer.goals USING btree ("matchId");
CREATE INDEX "fki_goal_matchpartId" ON matchanalyzer.goals USING btree (matchpart);
CREATE INDEX "fki_goal_playerId" ON matchanalyzer.goals USING btree (player);
CREATE INDEX "fki_goal_roundId" ON matchanalyzer.goals USING btree ("roundId");
CREATE INDEX "fki_goal_userId" ON matchanalyzer.goals USING btree ("userId");
CREATE INDEX "fki_match_awayteamId" ON matchanalyzer.matches USING btree ("awayTeam");
CREATE INDEX "fki_match_competitionId" ON matchanalyzer.matches USING btree (competition);
CREATE INDEX "fki_match_localteamId" ON matchanalyzer.matches USING btree ("localTeam");
CREATE INDEX "fki_match_roundId" ON matchanalyzer.matches USING btree (round);
CREATE INDEX "fki_match_userId" ON matchanalyzer.matches USING btree ("userId");
CREATE INDEX "fki_matchpart_match" ON matchanalyzer.matchparts USING btree ("matchId");
CREATE INDEX "fki_matchpart_team" ON matchanalyzer.matchparts USING btree (team);
CREATE INDEX "fki_matchpart_roundId" ON matchanalyzer.matchparts USING btree ("roundId");
CREATE INDEX "fki_matchpart_userId" ON matchanalyzer.matchparts USING btree ("userId");
CREATE INDEX "fki_minute_matchId" ON matchanalyzer.minutes USING btree ("matchId");
CREATE INDEX "fki_minute_matchpartId" ON matchanalyzer.minutes USING btree (matchpart);
CREATE INDEX "fki_minute_playerId" ON matchanalyzer.minutes USING btree (player);
CREATE INDEX "fki_minute_roundId" ON matchanalyzer.minutes USING btree ("roundId");
CREATE INDEX "fki_minute_userId" ON matchanalyzer.minutes USING btree ("userId");
CREATE INDEX "fki_player_teamId" ON matchanalyzer.players USING btree (team);
CREATE INDEX "fki_player_userId" ON matchanalyzer.players USING btree ("userId");
CREATE INDEX "fki_round_competitionId" ON matchanalyzer.rounds USING btree (competition);
CREATE INDEX "fki_round_userId" ON matchanalyzer.rounds USING btree ("userId");
CREATE INDEX "fki_substitution_match" ON matchanalyzer.substitutions USING btree ("matchId");
CREATE INDEX "fki_substitution_matchpart" ON matchanalyzer.substitutions USING btree (matchpart);
CREATE INDEX "fki_substitution_playerIn" ON matchanalyzer.substitutions USING btree ("playerIn");
CREATE INDEX "fki_substitution_playerOut" ON matchanalyzer.substitutions USING btree ("playerOut");
CREATE INDEX "fki_substitution_roundId" ON matchanalyzer.substitutions USING btree ("roundId");
CREATE INDEX "fki_substitution_userId" ON matchanalyzer.substitutions USING btree ("userId");
CREATE INDEX "fki_team_competitionId" ON matchanalyzer.teams USING btree (competition);
CREATE INDEX "fki_team_userId" ON matchanalyzer.teams USING btree ("userId");
CREATE UNIQUE INDEX idx_16480_email ON matchanalyzer.users USING btree (email);

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_goalId" FOREIGN KEY (goal) REFERENCES matchanalyzer.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_matchpart FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_playerId" FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_matchpartId" FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_playerId" FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT "competition_managerId" FOREIGN KEY (manager) REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT "competition_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_matchpartId" FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_playerId" FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_awayteamId" FOREIGN KEY ("awayTeam") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_competitionId" FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_localteamId" FOREIGN KEY ("localTeam") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_roundId" FOREIGN KEY (round) REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_team FOREIGN KEY (team) REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_matchpartId" FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_playerId" FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT "player_teamId" FOREIGN KEY (team) REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT "player_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT "round_competitionId" FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT "round_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_matchpart FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_playerIn" FOREIGN KEY ("playerIn") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_playerOut" FOREIGN KEY ("playerOut") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT "team_competitionId" FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT "team_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
