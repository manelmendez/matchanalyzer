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

DROP SCHEMA IF EXISTS matchanalyzer cascade;
CREATE SCHEMA matchanalyzer;
ALTER SCHEMA matchanalyzer OWNER TO matchanalyzer;

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
    "matchId" bigint NOT NULL,
    "matchpartId" bigint NOT NULL,
    "playerId" bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
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
-- Name: calendar_id_seq; Type: SEQUENCE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE SEQUENCE matchanalyzer.calendar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matchanalyzer.calendar_id_seq OWNER TO matchanalyzer;

--
-- Name: calendar; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.calendar (
    id bigint DEFAULT nextval('matchanalyzer.calendar_id_seq'::regclass) NOT NULL,
    title character varying NOT NULL,
    description character varying,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone NOT NULL,
    location character varying,
    "userId" bigint NOT NULL
);


ALTER TABLE matchanalyzer.calendar OWNER TO matchanalyzer;

--
-- Name: cards; Type: TABLE; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE TABLE matchanalyzer.cards (
    id bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint,
    type character varying(50) DEFAULT ''::character varying,
    "matchId" bigint NOT NULL,
    "matchpartId" bigint NOT NULL,
    "playerId" bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
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
    "managerId" bigint NOT NULL,
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
    "matchId" bigint NOT NULL,
    "matchpartId" bigint NOT NULL,
    "playerId" bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
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
    "localTeamId" bigint,
    "awayTeamId" bigint,
    "matchDay" date,
    "roundId" bigint NOT NULL,
    "competitionId" bigint NOT NULL,
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
    "roundId" bigint NOT NULL,
    "time" bigint,
    "teamId" bigint NOT NULL,
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
    "matchId" bigint NOT NULL,
    "matchpartId" bigint NOT NULL,
    "playerId" bigint NOT NULL,
    "roundId" bigint NOT NULL,
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
    firstname character varying(255) DEFAULT ''::character varying NOT NULL,
    lastname character varying(255) DEFAULT ''::character varying NOT NULL,
    avatar character varying(255),
    year integer NOT NULL,
    "teamId" bigint,
    "position" character varying(255) DEFAULT ''::character varying NOT NULL,
    "userId" bigint NOT NULL,
    guest boolean DEFAULT false NOT NULL
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
    "competitionId" bigint NOT NULL,
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
    "playerIn" bigint NOT NULL,
    "playerOut" bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint,
    "matchId" bigint NOT NULL,
    "matchpartId" bigint NOT NULL,
    "roundId" bigint NOT NULL,
    "userId" bigint NOT NULL
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
    "managerId" bigint,
    season character varying(50) DEFAULT ''::character varying NOT NULL,
    "competitionId" bigint,
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
    firstname character varying(255),
    lastname character varying(255),
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


--
-- Name: assists id; Type: DEFAULT; Schema: matchanalyzer; Owner: matchanalyzer
--

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

COPY matchanalyzer.assists (id, type, goal, "matchId", "matchpartId", "playerId", "roundId", "userId") FROM stdin;
\.


--
-- Data for Name: calendar; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.calendar (id, title, description, start, "end", location, "userId") FROM stdin;
5	Evento Insomnia	descripcion	2025-02-23 12:00:00+01	2025-02-23 20:00:00+01	Barcelona	2
8	Evento Insomnia 2	descripcion	2025-02-23 11:00:00+01	2025-02-23 14:00:00+01	Barcelona	2
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.cards (id, minute, type, "matchId", "matchpartId", "playerId", "roundId", "userId") FROM stdin;
\.


--
-- Data for Name: competitions; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.competitions (id, name, season, discipline, category, "managerId", "signupDate", "userId") FROM stdin;
3	2a División Grupo 5	19/20	F7	Alevín	2	2019-11-22 15:23:25+01	2
6	1a División Grupo 2	18/19	F7	Alevín	2	2020-01-17 12:41:28+01	2
20	Preferente Alevín Grupo 2	20/21	F7	Alevín	2	2020-10-18 21:10:38.581+02	2
\.


--
-- Data for Name: goals; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.goals (id, minute, type, "matchId", "matchpartId", "playerId", "roundId", "userId") FROM stdin;
26	6	\N	10	22	10	13	2
27	9	\N	10	22	9	13	2
28	12	\N	10	22	9	13	2
29	10	\N	10	23	3	13	2
30	10	\N	10	24	6	13	2
31	7	\N	10	25	7	13	2
33	4	\N	15	26	9	14	2
34	8	\N	15	26	8	14	2
35	10	\N	15	26	10	14	2
36	12	\N	15	26	10	14	2
37	1	\N	15	27	7	14	2
38	10	\N	15	28	6	14	2
39	12	\N	15	28	5	14	2
40	14	\N	15	28	10	14	2
41	15	\N	15	28	6	14	2
42	15	\N	15	28	10	14	2
43	1	\N	15	29	9	14	2
44	2	\N	15	29	4	14	2
45	4	\N	15	29	4	14	2
46	6	\N	15	29	9	14	2
47	7	\N	15	29	8	14	2
48	9	\N	15	29	10	14	2
49	11	\N	15	29	8	14	2
51	13	\N	10	25	8	14	2
52	1	\N	27	31	4	15	2
53	3	\N	27	31	9	15	2
54	4	\N	27	31	10	15	2
55	13	\N	27	31	9	15	2
56	15	\N	27	31	9	15	2
57	2	\N	27	32	5	15	2
58	3	\N	27	32	9	15	2
59	11	\N	27	32	4	15	2
60	3	\N	30	34	10	16	2
61	4	\N	30	34	8	16	2
62	5	\N	30	34	10	16	2
63	7	\N	30	34	9	16	2
64	15	\N	30	34	10	16	2
65	12	\N	30	35	4	16	2
66	1	\N	30	37	9	16	2
67	13	\N	30	37	10	16	2
68	8	\N	42	39	6	17	2
69	13	\N	42	39	10	17	2
70	14	\N	42	39	8	17	2
72	8	\N	42	40	3	17	2
73	9	\N	42	41	6	17	2
74	15	\N	42	41	9	17	2
75	6	\N	50	42	8	18	2
76	8	\N	50	42	10	18	2
77	15	\N	50	42	10	18	2
78	5	\N	50	43	8	18	2
79	14	\N	50	43	10	18	2
80	1	\N	50	44	7	18	2
81	7	\N	50	44	9	18	2
82	9	\N	50	44	5	18	2
83	10	\N	50	44	7	18	2
84	13	\N	50	44	7	18	2
85	2	\N	50	45	8	18	2
86	5	\N	50	45	8	18	2
87	10	\N	58	46	10	19	2
88	14	\N	58	48	5	19	2
89	2	\N	58	49	10	19	2
90	7	\N	58	49	10	19	2
91	12	\N	58	49	6	19	2
92	5	\N	68	50	9	20	2
93	3	\N	68	51	9	20	2
94	11	\N	68	51	9	20	2
96	13	\N	68	51	4	20	2
97	15	\N	68	53	6	20	2
98	2	\N	70	54	9	21	2
99	10	\N	70	54	6	21	2
100	9	\N	70	56	9	21	2
101	12	\N	70	56	9	21	2
102	1	\N	70	57	10	21	2
103	7	\N	70	57	4	21	2
104	9	\N	70	57	9	21	2
105	2	\N	84	58	8	22	2
106	5	\N	84	58	8	22	2
107	9	\N	84	58	10	22	2
108	12	\N	84	58	8	22	2
109	13	\N	84	58	2	22	2
110	1	\N	84	59	5	22	2
111	14	\N	84	59	10	22	2
112	14	\N	84	60	7	22	2
114	8	\N	84	61	8	22	2
115	10	\N	84	61	10	22	2
116	2	\N	85	62	6	23	2
117	3	\N	85	63	5	23	2
118	11	\N	85	63	8	23	2
119	5	\N	85	65	5	23	2
120	14	\N	85	65	10	23	2
121	7	\N	104	66	10	25	2
122	3	\N	104	67	7	25	2
123	11	\N	104	67	10	25	2
124	13	\N	104	67	7	25	2
125	14	\N	104	67	9	25	2
126	6	\N	104	68	2	25	2
127	11	\N	104	68	4	25	2
128	12	\N	104	68	9	25	2
129	14	\N	104	68	4	25	2
130	3	\N	104	69	4	25	2
131	4	\N	104	69	10	25	2
132	14	\N	104	69	9	25	2
133	4	\N	349	70	9	58	2
134	3	\N	349	73	9	58	2
135	1	\N	359	74	10	59	2
136	11	\N	359	74	5	59	2
137	14	\N	359	74	10	59	2
138	4	\N	359	75	7	59	2
139	4	\N	359	76	10	59	2
140	6	\N	359	76	8	59	2
141	13	\N	359	77	5	59	2
142	1	\N	361	78	7	60	2
143	8	\N	361	78	8	60	2
144	11	\N	361	78	5	60	2
146	13	\N	361	79	4	60	2
147	3	\N	361	80	2	60	2
148	5	\N	361	80	10	60	2
149	9	\N	361	80	9	60	2
150	2	\N	361	81	4	60	2
151	3	\N	361	81	8	60	2
152	2	\N	371	82	6	61	2
153	15	\N	371	82	4	61	2
154	9	\N	371	83	5	61	2
155	3	\N	371	84	10	61	2
156	4	\N	371	84	9	61	2
157	6	\N	371	84	10	61	2
158	13	\N	371	84	4	61	2
159	14	\N	371	84	10	61	2
160	6	\N	383	86	7	62	2
161	9	\N	383	86	3	62	2
162	12	\N	383	86	8	62	2
163	15	\N	383	86	8	62	2
164	2	\N	383	87	6	62	2
165	3	\N	383	87	9	62	2
166	5	\N	383	87	10	62	2
167	7	\N	383	87	10	62	2
168	8	\N	383	87	4	62	2
169	3	\N	383	88	10	62	2
170	8	\N	383	88	5	62	2
171	9	\N	383	88	8	62	2
172	11	\N	383	88	2	62	2
173	12	\N	383	88	5	62	2
174	13	\N	383	88	6	62	2
175	2	\N	383	89	9	62	2
176	3	\N	383	89	8	62	2
177	5	\N	383	89	9	62	2
178	6	\N	383	89	6	62	2
180	9	\N	383	89	10	62	2
181	6	\N	392	90	7	63	2
182	11	\N	392	91	10	63	2
183	2	\N	392	93	9	63	2
185	10	\N	392	93	7	63	2
186	3	\N	400	94	8	64	2
187	6	\N	400	94	2	64	2
188	11	\N	400	94	8	64	2
189	3	\N	400	95	8	64	2
191	13	\N	400	95	7	64	2
192	5	\N	400	96	9	64	2
193	6	\N	400	96	10	64	2
194	14	\N	400	96	9	64	2
195	7	\N	400	97	4	64	2
\.


--
-- Data for Name: matches; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.matches (id, "localTeamId", "awayTeamId", "matchDay", "roundId", "competitionId", "localTeamGoals", "awayTeamGoals", "userId") FROM stdin;
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


--
-- Data for Name: matchparts; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.matchparts (id, "matchId", formation, "roundId", "time", "teamId", "userId") FROM stdin;
22	10	3-1-2	13	15	13	2
23	10	3-1-2	13	15	13	2
24	10	3-1-2	13	15	13	2
25	10	3-1-2	13	15	13	2
26	15	3-1-2	14	15	13	2
27	15	3-1-2	14	15	13	2
28	15	3-1-2	14	15	13	2
29	15	3-1-2	14	15	13	2
30	27	3-1-2	15	15	13	2
31	27	3-1-2	15	15	13	2
32	27	3-1-2	15	15	13	2
33	27	3-1-2	15	15	13	2
34	30	3-1-2	16	15	13	2
35	30	3-1-2	16	15	13	2
36	30	3-1-2	16	15	13	2
37	30	3-1-2	16	15	13	2
38	42	3-1-2	17	15	13	2
39	42	3-1-2	17	15	13	2
40	42	3-1-2	17	15	13	2
41	42	3-1-2	17	15	13	2
42	50	3-1-2	18	15	13	2
43	50	3-1-2	18	15	13	2
44	50	3-1-2	18	15	13	2
45	50	3-1-2	18	15	13	2
46	58	3-1-2	19	15	13	2
47	58	3-1-2	19	15	13	2
48	58	3-1-2	19	15	13	2
49	58	2-3-1	19	15	13	2
50	68	3-1-2	20	15	13	2
51	68	3-1-2	20	15	13	2
52	68	3-1-2	20	15	13	2
53	68	3-1-2	20	15	13	2
54	70	3-1-2	21	15	13	2
55	70	3-1-2	21	15	13	2
56	70	3-1-2	21	15	13	2
57	70	3-1-2	21	15	13	2
58	84	3-1-2	22	15	13	2
59	84	3-1-2	22	15	13	2
60	84	3-1-2	22	15	13	2
61	84	3-1-2	22	15	13	2
62	85	3-1-2	23	15	13	2
63	85	3-1-2	23	15	13	2
64	85	3-1-2	23	15	13	2
65	85	3-1-2	23	15	13	2
66	104	3-1-2	25	15	13	2
67	104	3-1-2	25	15	13	2
68	104	3-1-2	25	15	13	2
69	104	3-1-2	25	15	13	2
70	349	3-1-2	58	15	13	2
71	349	3-1-2	58	15	13	2
72	349	3-1-2	58	15	13	2
73	349	3-1-2	58	15	13	2
74	359	3-1-2	59	15	13	2
75	359	3-1-2	59	15	13	2
76	359	3-1-2	59	15	13	2
77	359	3-1-2	59	15	13	2
78	361	3-1-2	60	15	13	2
79	361	3-1-2	60	15	13	2
80	361	3-1-2	60	15	13	2
81	361	3-1-2	60	15	13	2
82	371	3-1-2	61	15	13	2
83	371	3-1-2	61	15	13	2
84	371	3-1-2	61	15	13	2
85	371	3-1-2	61	15	13	2
86	383	3-1-2	62	15	13	2
87	383	3-1-2	62	15	13	2
88	383	3-1-2	62	15	13	2
89	383	3-1-2	62	15	13	2
90	392	3-1-2	63	15	13	2
91	392	3-1-2	63	15	13	2
92	392	3-1-2	63	15	13	2
93	392	3-1-2	63	15	13	2
94	400	3-1-2	64	15	13	2
95	400	3-1-2	64	15	13	2
96	400	3-1-2	64	15	13	2
97	400	3-1-2	64	15	13	2
\.


--
-- Data for Name: minutes; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.minutes (id, "matchId", "matchpartId", "playerId", "roundId", "userId", "position") FROM stdin;
2	10	22	1	13	2	PT
3	10	22	2	13	2	CT
4	10	22	4	13	2	LD
5	10	22	6	13	2	LI
6	10	22	7	13	2	MC
7	10	22	10	13	2	DC
12	10	22	9	13	2	DC
13	10	23	1	13	2	PT
14	10	23	2	13	2	CT
15	10	23	3	13	2	LD
16	10	23	5	13	2	LI
17	10	23	8	13	2	MC
18	10	23	9	13	2	DC
19	10	23	10	13	2	DC
20	10	24	1	13	2	PT
22	10	24	3	13	2	CT
23	10	24	4	13	2	LD
24	10	24	5	13	2	LI
25	10	24	7	13	2	MC
26	10	24	6	13	2	DC
27	10	24	8	13	2	DC
28	10	25	1	13	2	PT
29	10	25	2	13	2	CT
30	10	25	4	13	2	LD
31	10	25	6	13	2	LI
32	10	25	7	13	2	MC
33	10	25	10	13	2	DC
34	10	25	9	13	2	DC
35	15	26	1	14	2	PT
36	15	26	3	14	2	CT
37	15	26	4	14	2	LD
38	15	26	5	14	2	LI
39	15	26	8	14	2	MC
40	15	26	9	14	2	DC
41	15	26	10	14	2	DC
42	15	27	1	14	2	PT
43	15	27	2	14	2	CT
44	15	27	3	14	2	LD
45	15	27	6	14	2	LI
46	15	27	7	14	2	MC
47	15	27	9	14	2	DC
48	15	27	8	14	2	DC
49	15	28	1	14	2	PT
50	15	28	2	14	2	CT
51	15	28	4	14	2	LD
52	15	28	5	14	2	LI
53	15	28	7	14	2	MC
54	15	28	6	14	2	DC
55	15	28	10	14	2	DC
56	15	29	1	14	2	PT
57	15	29	3	14	2	CT
58	15	29	4	14	2	LD
59	15	29	5	14	2	LI
60	15	29	2	14	2	MC
61	15	29	8	14	2	DC
62	15	29	9	14	2	DC
63	27	30	1	15	2	PT
64	27	30	2	15	2	CT
65	27	30	6	15	2	LI
66	27	30	3	15	2	LD
67	27	30	7	15	2	MC
68	27	30	10	15	2	DC
69	27	30	8	15	2	DC
70	27	31	1	15	2	PT
71	27	31	2	15	2	CT
72	27	31	5	15	2	LI
73	27	31	4	15	2	LD
74	27	31	7	15	2	MC
75	27	31	9	15	2	DC
76	27	31	10	15	2	DC
77	27	32	1	15	2	PT
78	27	32	3	15	2	CT
79	27	32	5	15	2	LI
80	27	32	4	15	2	LD
81	27	32	8	15	2	MC
82	27	32	6	15	2	DC
83	27	32	9	15	2	DC
84	27	33	1	15	2	PT
85	27	33	2	15	2	CT
86	27	33	3	15	2	LI
87	27	33	4	15	2	LD
88	27	33	7	15	2	MC
89	27	33	10	15	2	DC
90	27	33	9	15	2	DC
91	30	34	1	16	2	PT
92	30	34	2	16	2	CT
93	30	34	5	16	2	LI
94	30	34	4	16	2	LD
95	30	34	8	16	2	MC
96	30	34	9	16	2	DC
97	30	34	10	16	2	DC
98	30	35	1	16	2	PT
99	30	35	2	16	2	CT
100	30	35	3	16	2	LI
101	30	35	4	16	2	LD
102	30	35	7	16	2	MC
103	30	35	6	16	2	DC
104	30	35	10	16	2	DC
105	30	36	1	16	2	PT
106	30	36	3	16	2	CT
107	30	36	5	16	2	LI
108	30	36	6	16	2	LD
109	30	36	7	16	2	MC
110	30	36	8	16	2	DC
111	30	36	9	16	2	DC
112	30	37	1	16	2	PT
113	30	37	2	16	2	CT
114	30	37	6	16	2	LI
115	30	37	4	16	2	LD
116	30	37	7	16	2	MC
117	30	37	9	16	2	DC
118	30	37	10	16	2	DC
119	42	38	1	17	2	PT
120	42	38	2	17	2	CT
121	42	38	6	17	2	LI
122	42	38	4	17	2	LD
123	42	38	7	17	2	MC
124	42	38	9	17	2	DC
125	42	38	8	17	2	DC
126	42	39	1	17	2	PT
127	42	39	2	17	2	CT
128	42	39	6	17	2	LI
129	42	39	3	17	2	LD
130	42	39	7	17	2	MC
131	42	39	8	17	2	DC
132	42	39	10	17	2	DC
133	42	40	1	17	2	PT
134	42	40	2	17	2	CT
135	42	40	3	17	2	LI
136	42	40	4	17	2	LD
137	42	40	8	17	2	MC
138	42	40	9	17	2	DC
139	42	40	10	17	2	DC
140	42	41	1	17	2	PT
141	42	41	3	17	2	CT
142	42	41	6	17	2	LI
143	42	41	4	17	2	LD
144	42	41	7	17	2	MC
145	42	41	9	17	2	DC
146	42	41	10	17	2	DC
147	50	42	1	18	2	PT
148	50	42	2	18	2	CT
149	50	42	5	18	2	LI
150	50	42	6	18	2	LD
151	50	42	8	18	2	MC
152	50	42	9	18	2	DC
153	50	42	10	18	2	DC
154	50	43	1	18	2	PT
155	50	43	3	18	2	CT
156	50	43	6	18	2	LI
157	50	43	4	18	2	LD
158	50	43	7	18	2	MC
159	50	43	10	18	2	DC
160	50	43	8	18	2	DC
161	50	44	1	18	2	PT
162	50	44	3	18	2	CT
163	50	44	5	18	2	LI
164	50	44	4	18	2	LD
165	50	44	2	18	2	MC
166	50	44	7	18	2	DC
167	50	44	9	18	2	DC
168	50	45	1	18	2	PT
169	50	45	2	18	2	CT
170	50	45	5	18	2	LI
171	50	45	6	18	2	LD
172	50	45	7	18	2	MC
173	50	45	8	18	2	DC
174	50	45	10	18	2	DC
175	58	46	1	19	2	PT
176	58	46	3	19	2	CT
177	58	46	6	19	2	LI
178	58	46	4	19	2	LD
179	58	46	7	19	2	MC
180	58	46	10	19	2	DC
181	58	46	8	19	2	DC
182	58	47	1	19	2	PT
183	58	47	2	19	2	CT
184	58	47	5	19	2	LI
185	58	47	3	19	2	LD
186	58	47	8	19	2	MC
187	58	47	6	19	2	DC
188	58	47	9	19	2	DC
189	58	48	1	19	2	PT
190	58	48	2	19	2	CT
191	58	48	5	19	2	LI
192	58	48	4	19	2	LD
193	58	48	7	19	2	MC
194	58	48	9	19	2	DC
195	58	48	10	19	2	DC
196	58	49	1	19	2	PT
197	58	49	8	19	2	CT
198	58	49	3	19	2	CT
199	58	49	5	19	2	MC
200	58	49	7	19	2	MC
201	58	49	6	19	2	MC
202	58	49	10	19	2	DC
203	68	50	1	20	2	PT
204	68	50	3	20	2	CT
205	68	50	5	20	2	LI
206	68	50	6	20	2	LD
207	68	50	7	20	2	MC
208	68	50	10	20	2	DC
209	68	50	9	20	2	DC
210	68	51	1	20	2	PT
211	68	51	2	20	2	CT
212	68	51	6	20	2	LI
213	68	51	4	20	2	LD
214	68	51	7	20	2	MC
215	68	51	8	20	2	DC
216	68	51	9	20	2	DC
217	68	52	1	20	2	PT
218	68	52	3	20	2	CT
219	68	52	5	20	2	LI
220	68	52	4	20	2	LD
221	68	52	2	20	2	MC
222	68	52	9	20	2	DC
223	68	52	10	20	2	DC
224	68	53	1	20	2	PT
225	68	53	2	20	2	CT
226	68	53	5	20	2	LI
227	68	53	3	20	2	LD
228	68	53	7	20	2	MC
229	68	53	10	20	2	DC
230	68	53	6	20	2	DC
231	70	54	1	21	2	PT
232	70	54	3	21	2	CT
233	70	54	6	21	2	LI
234	70	54	4	21	2	LD
235	70	54	7	21	2	MC
236	70	54	9	21	2	DC
237	70	54	10	21	2	DC
238	70	55	1	21	2	PT
239	70	55	2	21	2	CT
240	70	55	5	21	2	LI
241	70	55	4	21	2	LD
242	70	55	7	21	2	MC
243	70	55	8	21	2	DC
244	70	55	10	21	2	DC
245	70	56	1	21	2	PT
246	70	56	2	21	2	CT
247	70	56	5	21	2	LI
248	70	56	3	21	2	LD
249	70	56	7	21	2	MC
250	70	56	6	21	2	DC
251	70	56	9	21	2	DC
252	70	57	1	21	2	PT
253	70	57	3	21	2	CT
254	70	57	6	21	2	LI
255	70	57	4	21	2	LD
256	70	57	8	21	2	MC
257	70	57	9	21	2	DC
258	70	57	10	21	2	DC
259	84	58	1	22	2	PT
260	84	58	2	22	2	CT
261	84	58	6	22	2	LI
262	84	58	3	22	2	LD
263	84	58	7	22	2	MC
264	84	58	10	22	2	DC
265	84	58	8	22	2	DC
266	84	59	1	22	2	PT
267	84	59	2	22	2	CT
268	84	59	5	22	2	LI
269	84	59	4	22	2	LD
270	84	59	8	22	2	MC
271	84	59	10	22	2	DC
272	84	59	9	22	2	DC
273	84	60	1	22	2	PT
274	84	60	3	22	2	CT
275	84	60	5	22	2	LI
276	84	60	4	22	2	LD
277	84	60	7	22	2	MC
278	84	60	6	22	2	DC
279	84	60	9	22	2	DC
280	84	61	1	22	2	PT
281	84	61	2	22	2	CT
282	84	61	3	22	2	LI
283	84	61	4	22	2	LD
284	84	61	7	22	2	MC
285	84	61	8	22	2	DC
286	84	61	10	22	2	DC
287	85	62	1	23	2	PT
288	85	62	2	23	2	CT
289	85	62	5	23	2	LI
290	85	62	6	23	2	LD
291	85	62	7	23	2	MC
292	85	62	9	23	2	DC
293	85	62	8	23	2	DC
294	85	63	1	23	2	PT
295	85	63	2	23	2	CT
296	85	63	5	23	2	LI
297	85	63	4	23	2	LD
298	85	63	8	23	2	MC
299	85	63	10	23	2	DC
300	85	63	9	23	2	DC
301	85	64	1	23	2	PT
302	85	64	2	23	2	CT
303	85	64	6	23	2	LI
304	85	64	4	23	2	LD
305	85	64	7	23	2	MC
306	85	64	9	23	2	DC
307	85	64	10	23	2	DC
308	85	65	1	23	2	PT
309	85	65	2	23	2	CT
310	85	65	5	23	2	LI
311	85	65	4	23	2	LD
312	85	65	7	23	2	MC
313	85	65	10	23	2	DC
314	85	65	8	23	2	DC
315	104	66	1	25	2	PT
316	104	66	3	25	2	CT
317	104	66	5	25	2	LI
318	104	66	6	25	2	LD
319	104	66	7	25	2	MC
320	104	66	8	25	2	DC
321	104	66	10	25	2	DC
322	104	67	1	25	2	PT
323	104	67	2	25	2	CT
324	104	67	6	25	2	LI
325	104	67	4	25	2	LD
326	104	67	7	25	2	MC
327	104	67	10	25	2	DC
328	104	67	9	25	2	DC
329	104	68	1	25	2	PT
330	104	68	3	25	2	CT
331	104	68	5	25	2	LI
332	104	68	4	25	2	LD
333	104	68	2	25	2	MC
334	104	68	8	25	2	DC
335	104	68	9	25	2	DC
336	104	69	1	25	2	PT
337	104	69	3	25	2	CT
338	104	69	6	25	2	LI
339	104	69	4	25	2	LD
340	104	69	7	25	2	MC
341	104	69	8	25	2	DC
342	104	69	10	25	2	DC
343	349	70	1	58	2	PT
344	349	70	2	58	2	CT
345	349	70	5	58	2	LI
346	349	70	4	58	2	LD
347	349	70	7	58	2	MC
348	349	70	10	58	2	DC
349	349	70	9	58	2	DC
350	349	71	1	58	2	PT
351	349	71	3	58	2	CT
352	349	71	5	58	2	LI
353	349	71	6	58	2	LD
354	349	71	7	58	2	MC
355	349	71	8	58	2	DC
356	349	71	9	58	2	DC
357	349	72	1	58	2	PT
358	349	72	3	58	2	CT
359	349	72	6	58	2	LI
360	349	72	4	58	2	LD
361	349	72	2	58	2	MC
362	349	72	8	58	2	DC
363	349	72	10	58	2	DC
364	349	73	1	58	2	PT
365	349	73	2	58	2	CT
366	349	73	5	58	2	LI
367	349	73	4	58	2	LD
368	349	73	7	58	2	MC
369	349	73	8	58	2	DC
370	349	73	9	58	2	DC
371	359	74	1	59	2	PT
372	359	74	3	59	2	CT
373	359	74	5	59	2	LI
374	359	74	6	59	2	LD
375	359	74	8	59	2	MC
376	359	74	10	59	2	DC
377	359	74	9	59	2	DC
378	359	75	1	59	2	PT
379	359	75	3	59	2	CT
380	359	75	5	59	2	LI
381	359	75	4	59	2	LD
382	359	75	2	59	2	MC
383	359	75	9	59	2	DC
384	359	75	7	59	2	DC
385	359	76	1	59	2	PT
386	359	76	2	59	2	CT
387	359	76	6	59	2	LI
388	359	76	4	59	2	LD
389	359	76	7	59	2	MC
390	359	76	10	59	2	DC
391	359	76	8	59	2	DC
392	359	77	1	59	2	PT
393	359	77	3	59	2	CT
394	359	77	5	59	2	LI
395	359	77	4	59	2	LD
396	359	77	7	59	2	MC
397	359	77	6	59	2	DC
398	359	77	9	59	2	DC
399	361	78	1	60	2	PT
400	361	78	2	60	2	CT
401	361	78	5	60	2	LI
402	361	78	4	60	2	LD
403	361	78	7	60	2	MC
404	361	78	8	60	2	DC
405	361	78	9	60	2	DC
406	361	79	1	60	2	PT
407	361	79	3	60	2	CT
408	361	79	6	60	2	LI
409	361	79	4	60	2	LD
410	361	79	7	60	2	MC
411	361	79	8	60	2	DC
412	361	79	10	60	2	DC
413	361	80	1	60	2	PT
414	361	80	3	60	2	CT
415	361	80	5	60	2	LI
416	361	80	6	60	2	LD
417	361	80	2	60	2	MC
418	361	80	9	60	2	DC
419	361	80	10	60	2	DC
420	361	81	1	60	2	PT
421	361	81	3	60	2	CT
422	361	81	5	60	2	LI
423	361	81	4	60	2	LD
424	361	81	7	60	2	MC
425	361	81	10	60	2	DC
426	361	81	8	60	2	DC
427	371	82	1	61	2	PT
428	371	82	5	61	2	CT
429	371	82	6	61	2	LI
430	371	82	4	61	2	LD
431	371	82	7	61	2	MC
432	371	82	8	61	2	DC
433	371	82	9	61	2	DC
434	371	83	1	61	2	PT
435	371	83	2	61	2	CT
436	371	83	5	61	2	LI
437	371	83	3	61	2	LD
438	371	83	7	61	2	MC
439	371	83	10	61	2	DC
440	371	83	6	61	2	DC
441	371	84	1	61	2	PT
442	371	84	2	61	2	CT
443	371	84	3	61	2	LI
444	371	84	4	61	2	LD
445	371	84	8	61	2	MC
446	371	84	10	61	2	DC
447	371	84	9	61	2	DC
448	371	85	1	61	2	PT
449	371	85	2	61	2	CT
450	371	85	5	61	2	LI
451	371	85	4	61	2	LD
452	371	85	7	61	2	MC
453	371	85	6	61	2	DC
454	371	85	10	61	2	DC
455	383	86	1	62	2	PT
456	383	86	2	62	2	CT
457	383	86	5	62	2	LI
458	383	86	3	62	2	LD
459	383	86	7	62	2	MC
460	383	86	9	62	2	DC
461	383	86	8	62	2	DC
462	383	87	1	62	2	PT
463	383	87	3	62	2	CT
464	383	87	6	62	2	LI
465	383	87	4	62	2	LD
466	383	87	7	62	2	MC
467	383	87	9	62	2	DC
468	383	87	10	62	2	DC
469	383	88	1	62	2	PT
470	383	88	2	62	2	CT
471	383	88	5	62	2	LI
472	383	88	4	62	2	LD
473	383	88	8	62	2	MC
474	383	88	10	62	2	DC
475	383	88	6	62	2	DC
476	383	89	1	62	2	PT
477	383	89	2	62	2	CT
478	383	89	3	62	2	LI
479	383	89	6	62	2	LD
480	383	89	7	62	2	MC
481	383	89	9	62	2	DC
482	383	89	8	62	2	DC
483	392	90	1	63	2	PT
484	392	90	2	63	2	CT
485	392	90	5	63	2	LI
486	392	90	6	63	2	LD
487	392	90	7	63	2	MC
488	392	90	8	63	2	DC
489	392	90	10	63	2	DC
490	392	91	1	63	2	PT
491	392	91	2	63	2	CT
492	392	91	6	63	2	LI
493	392	91	4	63	2	LD
494	392	91	8	63	2	MC
495	392	91	9	63	2	DC
496	392	91	10	63	2	DC
497	392	92	1	63	2	PT
498	392	92	2	63	2	CT
499	392	92	5	63	2	LI
500	392	92	4	63	2	LD
501	392	92	7	63	2	MC
502	392	92	8	63	2	DC
503	392	92	9	63	2	DC
504	392	93	1	63	2	PT
505	392	93	2	63	2	CT
506	392	93	5	63	2	LI
507	392	93	4	63	2	LD
508	392	93	7	63	2	MC
509	392	93	10	63	2	DC
510	392	93	9	63	2	DC
511	400	94	1	64	2	PT
512	400	94	2	64	2	CT
513	400	94	6	64	2	LI
514	400	94	4	64	2	LD
515	400	94	7	64	2	MC
516	400	94	10	64	2	DC
517	400	94	8	64	2	DC
518	400	95	1	64	2	PT
519	400	95	2	64	2	CT
520	400	95	5	64	2	LI
521	400	95	4	64	2	LD
522	400	95	7	64	2	MC
523	400	95	8	64	2	DC
524	400	95	9	64	2	DC
525	400	96	1	64	2	PT
526	400	96	2	64	2	CT
527	400	96	5	64	2	LI
528	400	96	6	64	2	LD
529	400	96	8	64	2	MC
530	400	96	9	64	2	DC
531	400	96	10	64	2	DC
532	400	97	1	64	2	PT
533	400	97	5	64	2	LI
534	400	97	6	64	2	LI
535	400	97	4	64	2	LD
536	400	97	7	64	2	MC
537	400	97	10	64	2	DC
538	400	97	9	64	2	DC
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.players (id, firstname, lastname, avatar, year, "teamId", "position", "userId", guest) FROM stdin;
1	Pau	Sabio	assets/images/person_icon.png	2009	13	PT	2	f
2	Adrián	Cuadrado	assets/images/person_icon.png	2009	13	CT	2	f
3	Vadym	Bilanchyk	assets/images/person_icon.png	2009	13	CT	2	f
4	Marc	Morilla	assets/images/person_icon.png	2009	13	LD	2	f
5	Luc	Gironès	assets/images/person_icon.png	2009	13	LI	2	f
6	Pol	Moreno	assets/images/person_icon.png	2009	13	LD	2	f
7	Alfredo	Tiffón	assets/images/person_icon.png	2009	13	MC	2	f
8	Roberto	Tomás	assets/images/person_icon.png	2009	13	MP	2	f
9	Taemin	Noh	assets/images/person_icon.png	2009	13	DC	2	f
10	Welson	Jiménez	assets/images/person_icon.png	2009	13	DC	2	f
13	Michele	Grondona	assets/images/person_icon.png	2007	31	CT	2	f
15	Andrés	Torres Castellarnau	assets/images/person_icon.png	2007	31	LD	2	f
16	Natxo	Montero Raya	assets/images/person_icon.png	2007	31	LI	2	f
21	Alejandro	Santiago Vargas	assets/images/person_icon.png	2007	31	DC	2	f
12	David	Lloret Montes	\N	2007	31	PT	2	f
14	Álex	Carrillo Espejo	\N	2007	31	LD	2	f
18	Germán	Guillén Sala	\N	2007	31	MC	2	f
17	Xavi	Pérez Molinero	\N	2007	31	MCD	2	f
20	Hugo	Recio Punzano	\N	2007	31	DC	2	f
19	Pol	Mora Cañete	\N	2007	31	MP	2	f
11	Daniel	Oliva Bermúdez	\N	2007	31	PT	2	f
22	Pau	Sabio	assets/images/1602696660334-IMG_5178.jpg	2009	53	PT	2	f
23	Adrián	Cuadrado	assets/images/1602696708706-IMG_5180.jpg	2009	53	CT	2	f
24	Vadym	Bylanchik	assets/images/1603046819949-IMG_5181.jpg	2009	53	CT	2	f
25	Luc	Gironès	assets/images/1603047528525-IMG_5185.jpg	2009	53	LI	2	f
26	Marc	Morilla	assets/images/1603047970510-IMG_5179.jpg	2009	53	LD	2	f
27	Alfredo	Tiffón	assets/images/1603048010616-IMG_5184.jpg	2009	53	MC	2	f
28	Roberto	Tomás	assets/images/1603048050657-IMG_5183.jpg	2009	53	MP	2	f
29	Taemin	Noh	assets/images/1603048087990-IMG_5182.jpg	2009	53	DC	2	f
30	Welson	Jimenez	assets/images/1603048115953-IMG_5186.jpg	2009	53	DC	2	f
31	Oleksandr	Gavryliuk	\N	2009	53	DC	2	f
\.


--
-- Data for Name: rounds; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.rounds (id, name, date, "competitionId", "userId") FROM stdin;
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


--
-- Data for Name: substitutions; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.substitutions (id, "playerIn", "playerOut", minute, "matchId", "matchpartId", "roundId", "userId") FROM stdin;
5	3	4	7	10	25	13	2
6	5	6	7	10	25	13	2
7	8	9	7	10	25	13	2
8	6	10	10	10	25	13	2
9	6	4	7	15	29	14	2
10	7	2	7	15	29	14	2
11	10	9	7	15	29	14	2
12	6	3	7	27	33	15	2
13	3	2	10	27	33	15	2
14	8	7	10	27	33	15	2
15	5	10	10	27	33	15	2
16	8	10	10	42	41	17	2
17	4	5	7	50	45	18	2
18	9	8	7	50	45	18	2
19	3	7	10	50	45	18	2
20	10	8	7	68	51	20	2
21	4	3	10	68	53	20	2
22	9	10	10	68	53	20	2
23	7	8	5	70	57	21	2
24	5	3	7	84	61	22	2
25	6	4	7	84	61	22	2
26	9	7	7	84	61	22	2
27	9	7	5	85	65	23	2
28	6	4	10	85	65	23	2
29	2	6	7	104	69	25	2
30	9	10	7	104	69	25	2
31	10	8	10	349	73	58	2
32	3	5	13	349	73	58	2
33	6	4	13	349	73	58	2
34	3	2	8	359	77	59	2
35	8	7	8	359	77	59	2
36	10	9	8	359	77	59	2
37	2	3	8	361	81	60	2
38	6	4	8	361	81	60	2
39	9	7	8	361	81	60	2
40	4	10	11	361	81	60	2
41	3	2	7	371	85	61	2
42	8	7	7	371	85	61	2
43	9	10	7	371	85	61	2
44	10	5	11	371	85	61	2
46	10	9	5	383	89	62	2
47	4	8	5	383	89	62	2
48	5	2	7	383	89	62	2
49	8	6	10	383	89	62	2
50	8	5	7	400	97	64	2
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.teams (id, name, avatar, "signupDate", "managerId", season, "competitionId", "userId") FROM stdin;
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
53	FUNDACIÓ CORNELLÀ "B"	assets/images/1603048612830-fcornella.png	2020-10-14 18:34:49.551+02	2	20/21	20	2
54	BARCELONA, F.C.,B	assets/images/1603048730997-fcb.png	2020-10-18 21:16:16.131+02	\N	20/21	20	2
55	ESPANYOL, R.C.D.,A	assets/images/1603049293934-espanyol.png	2020-10-18 21:28:13.959+02	\N	20/21	20	2
56	DAMM, C.F.,A	assets/images/1603049585719-damm.png	2020-10-18 21:33:05.736+02	\N	20/21	20	2
57	GIMNASTIC MANRESA, C.,A	assets/images/1603049714824-gimnasticm.png	2020-10-18 21:35:14.84+02	\N	20/21	20	2
58	MERCANTIL, C.E,A	assets/images/1603049764480-mercantil.png	2020-10-18 21:36:04.505+02	\N	20/21	20	2
60	SANT CUGAT FUTBOL CLUB ,B	assets/images/1603050181215-santcugat.png	2020-10-18 21:43:01.225+02	\N	20/21	20	2
61	FUNDACIÓ FUTBOL BADALONA,A	assets/images/1603050213851-badalona.png	2020-10-18 21:43:33.878+02	\N	20/21	20	2
62	SABADELL F.C., C.E.,A	assets/images/1603050261188-sabadell.png	2020-10-18 21:44:21.199+02	\N	20/21	20	2
59	ESCOLA FUTBOL MATARO C.E,A	assets/images/1603050531353-mataro.png	2020-10-18 21:42:01.55+02	\N	20/21	20	2
63	VIC RIUPRIMER REFO FUTBOL CLUB,A	assets/images/1603050443901-riuprimer.png	2020-10-18 21:47:23.919+02	\N	20/21	20	2
64	MOLLET U.E.,CF.,A	assets/images/1603050761284-mollet.png	2020-10-18 21:52:41.305+02	\N	20/21	20	2
65	EUROPA, C.E.,A	assets/images/1603050842315-ceeuropa.png	2020-10-18 21:54:02.336+02	\N	20/21	20	2
66	SANT ANDREU, U.E,A	assets/images/1603050879862-santandreu.png	2020-10-18 21:54:39.877+02	\N	20/21	20	2
67	AQUA HOTEL FUTBOL CLUB,A	assets/images/1603050915107-aquahotel.png	2020-10-18 21:55:15.124+02	\N	20/21	20	2
68	VILA OLIMPICA CLUB ESP.,A	assets/images/1603050942675-vila.png	2020-10-18 21:55:42.691+02	\N	20/21	20	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: matchanalyzer; Owner: matchanalyzer
--

COPY matchanalyzer.users (id, email, firstname, lastname, avatar, provider, provider_id, password, "signupDate", "lastLogin", role) FROM stdin;
1	admin@matchanalyzer.com	admin	admin	\N	local	\N	$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.	2019-12-02 12:46:52+01	2020-05-30 19:05:38+02	admin
2	manel@gmail.com	Manel	Méndez	\N	local	\N	$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.	2019-12-02 12:46:52+01	2020-08-04 02:58:57.579+02	user
\.


--
-- Name: assists_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.assists_id_seq', 1, false);


--
-- Name: calendar_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.calendar_id_seq', 8, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.cards_id_seq', 1, true);


--
-- Name: competitions_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.competitions_id_seq', 20, true);


--
-- Name: goals_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.goals_id_seq', 195, true);


--
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.matches_id_seq', 408, true);


--
-- Name: matchparts_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.matchparts_id_seq', 97, true);


--
-- Name: minutes_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.minutes_id_seq', 538, true);


--
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.players_id_seq', 31, true);


--
-- Name: rounds_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.rounds_id_seq', 64, true);


--
-- Name: substitutions_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.substitutions_id_seq', 50, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.teams_id_seq', 68, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: matchanalyzer; Owner: matchanalyzer
--

SELECT pg_catalog.setval('matchanalyzer.users_id_seq', 2, true);


--
-- Name: calendar calendar_pkey; Type: CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.calendar
    ADD CONSTRAINT calendar_pkey PRIMARY KEY (id);


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
-- Name: fki_assist_goalId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_assist_goalId" ON matchanalyzer.assists USING btree (goal);


--
-- Name: fki_assist_match; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX fki_assist_match ON matchanalyzer.assists USING btree ("matchId");


--
-- Name: fki_assist_matchpart; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX fki_assist_matchpart ON matchanalyzer.assists USING btree ("matchpartId");


--
-- Name: fki_assist_playerId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_assist_playerId" ON matchanalyzer.assists USING btree ("playerId");


--
-- Name: fki_assist_roundId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_assist_roundId" ON matchanalyzer.assists USING btree ("roundId");


--
-- Name: fki_assist_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_assist_userId" ON matchanalyzer.assists USING btree ("userId");


--
-- Name: fki_calendar_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_calendar_userId" ON matchanalyzer.calendar USING btree ("userId");


--
-- Name: fki_card_matchId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_card_matchId" ON matchanalyzer.cards USING btree ("matchId");


--
-- Name: fki_card_matchpartId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_card_matchpartId" ON matchanalyzer.cards USING btree ("matchpartId");


--
-- Name: fki_card_playerId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_card_playerId" ON matchanalyzer.cards USING btree ("playerId");


--
-- Name: fki_card_roundId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_card_roundId" ON matchanalyzer.cards USING btree ("roundId");


--
-- Name: fki_card_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_card_userId" ON matchanalyzer.cards USING btree ("userId");


--
-- Name: fki_competition_managerId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_competition_managerId" ON matchanalyzer.competitions USING btree ("managerId");


--
-- Name: fki_competition_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_competition_userId" ON matchanalyzer.competitions USING btree ("userId");


--
-- Name: fki_goal_matchId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_goal_matchId" ON matchanalyzer.goals USING btree ("matchId");


--
-- Name: fki_goal_matchpartId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_goal_matchpartId" ON matchanalyzer.goals USING btree ("matchpartId");


--
-- Name: fki_goal_playerId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_goal_playerId" ON matchanalyzer.goals USING btree ("playerId");


--
-- Name: fki_goal_roundId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_goal_roundId" ON matchanalyzer.goals USING btree ("roundId");


--
-- Name: fki_goal_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_goal_userId" ON matchanalyzer.goals USING btree ("userId");


--
-- Name: fki_match_awayTeamId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_match_awayTeamId" ON matchanalyzer.matches USING btree ("awayTeamId");


--
-- Name: fki_match_competitionId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_match_competitionId" ON matchanalyzer.matches USING btree ("competitionId");


--
-- Name: fki_match_localTeamId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_match_localTeamId" ON matchanalyzer.matches USING btree ("localTeamId");


--
-- Name: fki_match_roundId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_match_roundId" ON matchanalyzer.matches USING btree ("roundId");


--
-- Name: fki_match_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_match_userId" ON matchanalyzer.matches USING btree ("userId");


--
-- Name: fki_matchpart_match; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX fki_matchpart_match ON matchanalyzer.matchparts USING btree ("matchId");


--
-- Name: fki_matchpart_roundId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_matchpart_roundId" ON matchanalyzer.matchparts USING btree ("roundId");


--
-- Name: fki_matchpart_team; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX fki_matchpart_team ON matchanalyzer.matchparts USING btree ("teamId");


--
-- Name: fki_matchpart_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_matchpart_userId" ON matchanalyzer.matchparts USING btree ("userId");


--
-- Name: fki_minute_matchId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_minute_matchId" ON matchanalyzer.minutes USING btree ("matchId");


--
-- Name: fki_minute_matchpartId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_minute_matchpartId" ON matchanalyzer.minutes USING btree ("matchpartId");


--
-- Name: fki_minute_playerId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_minute_playerId" ON matchanalyzer.minutes USING btree ("playerId");


--
-- Name: fki_minute_roundId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_minute_roundId" ON matchanalyzer.minutes USING btree ("roundId");


--
-- Name: fki_minute_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_minute_userId" ON matchanalyzer.minutes USING btree ("userId");


--
-- Name: fki_player_teamId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_player_teamId" ON matchanalyzer.players USING btree ("teamId");


--
-- Name: fki_player_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_player_userId" ON matchanalyzer.players USING btree ("userId");


--
-- Name: fki_round_competitionId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_round_competitionId" ON matchanalyzer.rounds USING btree ("competitionId");


--
-- Name: fki_round_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_round_userId" ON matchanalyzer.rounds USING btree ("userId");


--
-- Name: fki_substitution_match; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX fki_substitution_match ON matchanalyzer.substitutions USING btree ("matchId");


--
-- Name: fki_substitution_matchpart; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX fki_substitution_matchpart ON matchanalyzer.substitutions USING btree ("matchpartId");


--
-- Name: fki_substitution_playerIn; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_substitution_playerIn" ON matchanalyzer.substitutions USING btree ("playerIn");


--
-- Name: fki_substitution_playerOut; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_substitution_playerOut" ON matchanalyzer.substitutions USING btree ("playerOut");


--
-- Name: fki_substitution_roundId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_substitution_roundId" ON matchanalyzer.substitutions USING btree ("roundId");


--
-- Name: fki_substitution_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_substitution_userId" ON matchanalyzer.substitutions USING btree ("userId");


--
-- Name: fki_team_competitionId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_team_competitionId" ON matchanalyzer.teams USING btree ("competitionId");


--
-- Name: fki_team_userId; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE INDEX "fki_team_userId" ON matchanalyzer.teams USING btree ("userId");


--
-- Name: idx_16411_name; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE UNIQUE INDEX idx_16411_name ON matchanalyzer.competitions USING btree (name);


--
-- Name: idx_16480_email; Type: INDEX; Schema: matchanalyzer; Owner: matchanalyzer
--

CREATE UNIQUE INDEX idx_16480_email ON matchanalyzer.users USING btree (email);


--
-- Name: assists assist_goalId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_goalId" FOREIGN KEY (goal) REFERENCES matchanalyzer.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_matchId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_matchpartId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_playerId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_roundId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: assists assist_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: calendar calendar_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.calendar
    ADD CONSTRAINT "calendar_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards card_matchId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards card_matchpartId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards card_playerId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cards card_roundId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards card_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: competitions competition_managerId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT "competition_managerId" FOREIGN KEY ("managerId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: competitions competition_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT "competition_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: goals goal_matchId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: goals goal_matchpartId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: goals goal_playerId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: goals goal_roundId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: goals goal_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matches match_awayTeamId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_awayTeamId" FOREIGN KEY ("awayTeamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: matches match_competitionId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_competitionId" FOREIGN KEY ("competitionId") REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matches match_localTeamId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_localTeamId" FOREIGN KEY ("localTeamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: matches match_roundId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matches match_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matchparts matchpart_matchId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matchparts matchpart_roundId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matchparts matchpart_teamId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_teamId" FOREIGN KEY ("teamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matchparts matchpart_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_matchId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_matchpartId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_playerId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_roundId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: minutes minute_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: players player_teamId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT "player_teamId" FOREIGN KEY ("teamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: players player_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT "player_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rounds round_competitionId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT "round_competitionId" FOREIGN KEY ("competitionId") REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rounds round_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT "round_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_matchId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_matchpartId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_playerIn; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_playerIn" FOREIGN KEY ("playerIn") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_playerOut; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_playerOut" FOREIGN KEY ("playerOut") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_roundId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: substitutions substitution_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teams team_competitionId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT "team_competitionId" FOREIGN KEY ("competitionId") REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teams team_userId; Type: FK CONSTRAINT; Schema: matchanalyzer; Owner: matchanalyzer
--

ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT "team_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

