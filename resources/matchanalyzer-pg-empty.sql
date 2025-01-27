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
    "matchpartId" bigint NOT NULL,
    "playerId" bigint NOT NULL,
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
    "managerId" bigint NOT NULL,
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
    "matchpartId" bigint NOT NULL,
    "playerId" bigint NOT NULL,
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
    "teamId" bigint NOT NULL,
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
    "matchpartId" bigint NOT NULL,
    "playerId" bigint NOT NULL,
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
    "competitionId" bigint NOT NULL,
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
    "matchpartId" bigint NOT NULL,
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
    "managerId" bigint,
    season character varying(50) DEFAULT ''::character varying NOT NULL,
    "competitionId" bigint,
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


COPY matchanalyzer.users (id, email, firstname, lastname, avatar, provider, provider_id, password, "signupDate", "lastLogin", role) FROM stdin;
1	admin@matchanalyzer.com	admin	admin	\N	local	\N	$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.	2019-12-02 12:46:52+01	2020-05-30 19:05:38+02	admin
\.

SELECT pg_catalog.setval('matchanalyzer.users_id_seq', 1, true);

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
CREATE INDEX "fki_assist_matchpart" ON matchanalyzer.assists USING btree ("matchpartId");
CREATE INDEX "fki_assist_playerId" ON matchanalyzer.assists USING btree ("playerId");
CREATE INDEX "fki_assist_roundId" ON matchanalyzer.assists USING btree ("roundId");
CREATE INDEX "fki_assist_userId" ON matchanalyzer.assists USING btree ("userId");
CREATE INDEX "fki_card_matchId" ON matchanalyzer.cards USING btree ("matchId");
CREATE INDEX "fki_card_matchpartId" ON matchanalyzer.cards USING btree ("matchpartId");
CREATE INDEX "fki_card_playerId" ON matchanalyzer.cards USING btree ("playerId");
CREATE INDEX "fki_card_roundId" ON matchanalyzer.cards USING btree ("roundId");
CREATE INDEX "fki_card_userId" ON matchanalyzer.cards USING btree ("userId");
CREATE INDEX "fki_competition_managerId" ON matchanalyzer.competitions USING btree ("managerId");
CREATE INDEX "fki_competition_userId" ON matchanalyzer.competitions USING btree ("userId");
CREATE UNIQUE INDEX idx_16411_name ON matchanalyzer.competitions USING btree (name);
CREATE INDEX "fki_goal_matchId" ON matchanalyzer.goals USING btree ("matchId");
CREATE INDEX "fki_goal_matchpartId" ON matchanalyzer.goals USING btree ("matchpartId");
CREATE INDEX "fki_goal_playerId" ON matchanalyzer.goals USING btree ("playerId");
CREATE INDEX "fki_goal_roundId" ON matchanalyzer.goals USING btree ("roundId");
CREATE INDEX "fki_goal_userId" ON matchanalyzer.goals USING btree ("userId");
CREATE INDEX "fki_match_awayTeamId" ON matchanalyzer.matches USING btree ("awayTeamId");
CREATE INDEX "fki_match_competitionId" ON matchanalyzer.matches USING btree ("competitionId");
CREATE INDEX "fki_match_localTeamId" ON matchanalyzer.matches USING btree ("localTeamId");
CREATE INDEX "fki_match_roundId" ON matchanalyzer.matches USING btree ("roundId");
CREATE INDEX "fki_match_userId" ON matchanalyzer.matches USING btree ("userId");
CREATE INDEX "fki_matchpart_match" ON matchanalyzer.matchparts USING btree ("matchId");
CREATE INDEX "fki_matchpart_team" ON matchanalyzer.matchparts USING btree ("teamId");
CREATE INDEX "fki_matchpart_roundId" ON matchanalyzer.matchparts USING btree ("roundId");
CREATE INDEX "fki_matchpart_userId" ON matchanalyzer.matchparts USING btree ("userId");
CREATE INDEX "fki_minute_matchId" ON matchanalyzer.minutes USING btree ("matchId");
CREATE INDEX "fki_minute_matchpartId" ON matchanalyzer.minutes USING btree ("matchpartId");
CREATE INDEX "fki_minute_playerId" ON matchanalyzer.minutes USING btree ("playerId");
CREATE INDEX "fki_minute_roundId" ON matchanalyzer.minutes USING btree ("roundId");
CREATE INDEX "fki_minute_userId" ON matchanalyzer.minutes USING btree ("userId");
CREATE INDEX "fki_player_teamId" ON matchanalyzer.players USING btree ("teamId");
CREATE INDEX "fki_player_userId" ON matchanalyzer.players USING btree ("userId");
CREATE INDEX "fki_round_competitionId" ON matchanalyzer.rounds USING btree ("competitionId");
CREATE INDEX "fki_round_userId" ON matchanalyzer.rounds USING btree ("userId");
CREATE INDEX "fki_substitution_match" ON matchanalyzer.substitutions USING btree ("matchId");
CREATE INDEX "fki_substitution_matchpart" ON matchanalyzer.substitutions USING btree ("matchpartId");
CREATE INDEX "fki_substitution_playerIn" ON matchanalyzer.substitutions USING btree ("playerIn");
CREATE INDEX "fki_substitution_playerOut" ON matchanalyzer.substitutions USING btree ("playerOut");
CREATE INDEX "fki_substitution_roundId" ON matchanalyzer.substitutions USING btree ("roundId");
CREATE INDEX "fki_substitution_userId" ON matchanalyzer.substitutions USING btree ("userId");
CREATE INDEX "fki_team_competitionId" ON matchanalyzer.teams USING btree ("competitionId");
CREATE INDEX "fki_team_userId" ON matchanalyzer.teams USING btree ("userId");
CREATE UNIQUE INDEX idx_16480_email ON matchanalyzer.users USING btree (email);

ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_goalId" FOREIGN KEY (goal) REFERENCES matchanalyzer.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT "assist_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT "card_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT "competition_managerId" FOREIGN KEY ("managerId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT "competition_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT "goal_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_awayTeamId" FOREIGN KEY ("awayTeamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_competitionId" FOREIGN KEY ("competitionId") REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_localTeamId" FOREIGN KEY ("localTeamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT "match_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_teamId" FOREIGN KEY ("teamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT "matchpart_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_playerId" FOREIGN KEY ("playerId") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT "minute_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT "player_teamId" FOREIGN KEY ("teamId") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT "player_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT "round_competitionId" FOREIGN KEY ("competitionId") REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT "round_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_matchId" FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_matchpartId" FOREIGN KEY ("matchpartId") REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_playerIn" FOREIGN KEY ("playerIn") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_playerOut" FOREIGN KEY ("playerOut") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_roundId" FOREIGN KEY ("roundId") REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT "substitution_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT "team_competitionId" FOREIGN KEY ("competitionId") REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT "team_userId" FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
