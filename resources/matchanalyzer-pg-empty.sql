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

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT                       -- SELECT list can stay empty for this
      FROM   pg_catalog.pg_roles
      WHERE  rolname = 'matchanalyzer') THEN
      CREATE ROLE matchanalyzer LOGIN PASSWORD 'matchanalyzer';
   END IF;
END
$do$;

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

