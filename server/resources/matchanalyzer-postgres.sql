PGDMP                         x           matchanalyzer    12.3    12.3 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    matchanalyzer    DATABASE     �   CREATE DATABASE matchanalyzer WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE matchanalyzer;
                matchanalyzer    false                        2615    16401    matchanalyzer    SCHEMA        CREATE SCHEMA matchanalyzer;
    DROP SCHEMA matchanalyzer;
                matchanalyzer    false            �           1247    16403 
   users_role    TYPE     J   CREATE TYPE matchanalyzer.users_role AS ENUM (
    'user',
    'admin'
);
 $   DROP TYPE matchanalyzer.users_role;
       matchanalyzer          matchanalyzer    false    8            �            1259    16407    assists    TABLE     �   CREATE TABLE matchanalyzer.assists (
    id bigint NOT NULL,
    type character varying(50),
    goal bigint,
    "matchId" bigint,
    matchpart bigint,
    player bigint,
    "userId" bigint
);
 "   DROP TABLE matchanalyzer.assists;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16410    assists_id_seq    SEQUENCE     ~   CREATE SEQUENCE matchanalyzer.assists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE matchanalyzer.assists_id_seq;
       matchanalyzer          matchanalyzer    false    8    204            �           0    0    assists_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE matchanalyzer.assists_id_seq OWNED BY matchanalyzer.assists.id;
          matchanalyzer          matchanalyzer    false    205            �            1259    16412    cards    TABLE     �   CREATE TABLE matchanalyzer.cards (
    id bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint,
    type character varying(50) DEFAULT ''::character varying,
    player bigint,
    "matchId" bigint,
    "userId" bigint NOT NULL,
    matchpart bigint
);
     DROP TABLE matchanalyzer.cards;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16417    cards_id_seq    SEQUENCE     |   CREATE SEQUENCE matchanalyzer.cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE matchanalyzer.cards_id_seq;
       matchanalyzer          matchanalyzer    false    8    206            �           0    0    cards_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE matchanalyzer.cards_id_seq OWNED BY matchanalyzer.cards.id;
          matchanalyzer          matchanalyzer    false    207            �            1259    16419    competitions    TABLE     ^  CREATE TABLE matchanalyzer.competitions (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    season character varying(50),
    discipline character varying(50),
    category character varying(50),
    manager bigint NOT NULL,
    "signupDate" timestamp with time zone,
    "userId" bigint NOT NULL
);
 '   DROP TABLE matchanalyzer.competitions;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16423    competitions_id_seq    SEQUENCE     �   CREATE SEQUENCE matchanalyzer.competitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE matchanalyzer.competitions_id_seq;
       matchanalyzer          matchanalyzer    false    208    8            �           0    0    competitions_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE matchanalyzer.competitions_id_seq OWNED BY matchanalyzer.competitions.id;
          matchanalyzer          matchanalyzer    false    209            �            1259    16425    goals    TABLE       CREATE TABLE matchanalyzer.goals (
    id bigint NOT NULL,
    minute bigint DEFAULT '0'::bigint NOT NULL,
    type character varying(50) DEFAULT ''::character varying,
    player bigint,
    "matchId" bigint,
    "userId" bigint NOT NULL,
    matchpart bigint
);
     DROP TABLE matchanalyzer.goals;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16430    goals_id_seq    SEQUENCE     |   CREATE SEQUENCE matchanalyzer.goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE matchanalyzer.goals_id_seq;
       matchanalyzer          matchanalyzer    false    8    210            �           0    0    goals_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE matchanalyzer.goals_id_seq OWNED BY matchanalyzer.goals.id;
          matchanalyzer          matchanalyzer    false    211            �            1259    16432    matches    TABLE     &  CREATE TABLE matchanalyzer.matches (
    id bigint NOT NULL,
    "localTeam" bigint,
    "awayTeam" bigint,
    matchday date,
    round bigint NOT NULL,
    competition bigint NOT NULL,
    "localTeamGoals" bigint NOT NULL,
    "awayTeamGoals" bigint NOT NULL,
    "userId" bigint NOT NULL
);
 "   DROP TABLE matchanalyzer.matches;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16435    matches_id_seq    SEQUENCE     ~   CREATE SEQUENCE matchanalyzer.matches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE matchanalyzer.matches_id_seq;
       matchanalyzer          matchanalyzer    false    212    8            �           0    0    matches_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE matchanalyzer.matches_id_seq OWNED BY matchanalyzer.matches.id;
          matchanalyzer          matchanalyzer    false    213            �            1259    16437 
   matchparts    TABLE     �   CREATE TABLE matchanalyzer.matchparts (
    id bigint NOT NULL,
    "matchId" bigint NOT NULL,
    formation character varying(50),
    "time" bigint,
    team bigint,
    "userId" bigint NOT NULL
);
 %   DROP TABLE matchanalyzer.matchparts;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16440    matchparts_id_seq    SEQUENCE     �   CREATE SEQUENCE matchanalyzer.matchparts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE matchanalyzer.matchparts_id_seq;
       matchanalyzer          matchanalyzer    false    8    214            �           0    0    matchparts_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE matchanalyzer.matchparts_id_seq OWNED BY matchanalyzer.matchparts.id;
          matchanalyzer          matchanalyzer    false    215            �            1259    16442    minutes    TABLE     �   CREATE TABLE matchanalyzer.minutes (
    id bigint NOT NULL,
    player bigint NOT NULL,
    matchpart bigint NOT NULL,
    "matchId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    "position" character varying(50)
);
 "   DROP TABLE matchanalyzer.minutes;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16445    minutes_id_seq    SEQUENCE     ~   CREATE SEQUENCE matchanalyzer.minutes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE matchanalyzer.minutes_id_seq;
       matchanalyzer          matchanalyzer    false    8    216            �           0    0    minutes_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE matchanalyzer.minutes_id_seq OWNED BY matchanalyzer.minutes.id;
          matchanalyzer          matchanalyzer    false    217            �            1259    16447    players    TABLE     B  CREATE TABLE matchanalyzer.players (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    avatar character varying(255),
    year integer NOT NULL,
    team bigint,
    "position" character varying(255) DEFAULT ''::character varying NOT NULL,
    "userId" bigint NOT NULL
);
 "   DROP TABLE matchanalyzer.players;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16455    players_id_seq    SEQUENCE     ~   CREATE SEQUENCE matchanalyzer.players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE matchanalyzer.players_id_seq;
       matchanalyzer          matchanalyzer    false    218    8            �           0    0    players_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE matchanalyzer.players_id_seq OWNED BY matchanalyzer.players.id;
          matchanalyzer          matchanalyzer    false    219            �            1259    16457    rounds    TABLE     �   CREATE TABLE matchanalyzer.rounds (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    date date,
    competition bigint NOT NULL,
    "userId" bigint NOT NULL
);
 !   DROP TABLE matchanalyzer.rounds;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16461    rounds_id_seq    SEQUENCE     }   CREATE SEQUENCE matchanalyzer.rounds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE matchanalyzer.rounds_id_seq;
       matchanalyzer          matchanalyzer    false    8    220            �           0    0    rounds_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE matchanalyzer.rounds_id_seq OWNED BY matchanalyzer.rounds.id;
          matchanalyzer          matchanalyzer    false    221            �            1259    16463    substitutions    TABLE     �   CREATE TABLE matchanalyzer.substitutions (
    id bigint NOT NULL,
    "playerIn" bigint,
    "playerOut" bigint,
    minute bigint DEFAULT '0'::bigint,
    matchid bigint,
    "userId" bigint NOT NULL,
    matchpart bigint
);
 (   DROP TABLE matchanalyzer.substitutions;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16467    substitutions_id_seq    SEQUENCE     �   CREATE SEQUENCE matchanalyzer.substitutions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE matchanalyzer.substitutions_id_seq;
       matchanalyzer          matchanalyzer    false    8    222            �           0    0    substitutions_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE matchanalyzer.substitutions_id_seq OWNED BY matchanalyzer.substitutions.id;
          matchanalyzer          matchanalyzer    false    223            �            1259    16469    teams    TABLE     f  CREATE TABLE matchanalyzer.teams (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    avatar character varying(255),
    "signupDate" timestamp with time zone,
    manager bigint,
    season character varying(50) DEFAULT ''::character varying NOT NULL,
    competition bigint,
    "userId" bigint NOT NULL
);
     DROP TABLE matchanalyzer.teams;
       matchanalyzer         heap    matchanalyzer    false    8            �            1259    16477    teams_id_seq    SEQUENCE     |   CREATE SEQUENCE matchanalyzer.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE matchanalyzer.teams_id_seq;
       matchanalyzer          matchanalyzer    false    224    8            �           0    0    teams_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE matchanalyzer.teams_id_seq OWNED BY matchanalyzer.teams.id;
          matchanalyzer          matchanalyzer    false    225            �            1259    16479    users    TABLE     $  CREATE TABLE matchanalyzer.users (
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
     DROP TABLE matchanalyzer.users;
       matchanalyzer         heap    matchanalyzer    false    651    8    651            �            1259    16489    users_id_seq    SEQUENCE     |   CREATE SEQUENCE matchanalyzer.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE matchanalyzer.users_id_seq;
       matchanalyzer          matchanalyzer    false    8    226            �           0    0    users_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE matchanalyzer.users_id_seq OWNED BY matchanalyzer.users.id;
          matchanalyzer          matchanalyzer    false    227            �            1259    16395    a    TABLE     )   CREATE TABLE public.a (
    name text
);
    DROP TABLE public.a;
       public         heap    postgres    false            �
           2604    16758 
   assists id    DEFAULT     v   ALTER TABLE ONLY matchanalyzer.assists ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.assists_id_seq'::regclass);
 @   ALTER TABLE matchanalyzer.assists ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    205    204            �
           2604    16759    cards id    DEFAULT     r   ALTER TABLE ONLY matchanalyzer.cards ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.cards_id_seq'::regclass);
 >   ALTER TABLE matchanalyzer.cards ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    207    206            �
           2604    16760    competitions id    DEFAULT     �   ALTER TABLE ONLY matchanalyzer.competitions ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.competitions_id_seq'::regclass);
 E   ALTER TABLE matchanalyzer.competitions ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    209    208            �
           2604    16761    goals id    DEFAULT     r   ALTER TABLE ONLY matchanalyzer.goals ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.goals_id_seq'::regclass);
 >   ALTER TABLE matchanalyzer.goals ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    211    210            �
           2604    16762 
   matches id    DEFAULT     v   ALTER TABLE ONLY matchanalyzer.matches ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.matches_id_seq'::regclass);
 @   ALTER TABLE matchanalyzer.matches ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    213    212            �
           2604    16763    matchparts id    DEFAULT     |   ALTER TABLE ONLY matchanalyzer.matchparts ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.matchparts_id_seq'::regclass);
 C   ALTER TABLE matchanalyzer.matchparts ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    215    214            �
           2604    16764 
   minutes id    DEFAULT     v   ALTER TABLE ONLY matchanalyzer.minutes ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.minutes_id_seq'::regclass);
 @   ALTER TABLE matchanalyzer.minutes ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    217    216            �
           2604    16765 
   players id    DEFAULT     v   ALTER TABLE ONLY matchanalyzer.players ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.players_id_seq'::regclass);
 @   ALTER TABLE matchanalyzer.players ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    219    218            �
           2604    16766 	   rounds id    DEFAULT     t   ALTER TABLE ONLY matchanalyzer.rounds ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.rounds_id_seq'::regclass);
 ?   ALTER TABLE matchanalyzer.rounds ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    221    220            �
           2604    16767    substitutions id    DEFAULT     �   ALTER TABLE ONLY matchanalyzer.substitutions ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.substitutions_id_seq'::regclass);
 F   ALTER TABLE matchanalyzer.substitutions ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    223    222            �
           2604    16768    teams id    DEFAULT     r   ALTER TABLE ONLY matchanalyzer.teams ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.teams_id_seq'::regclass);
 >   ALTER TABLE matchanalyzer.teams ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    225    224            �
           2604    16769    users id    DEFAULT     r   ALTER TABLE ONLY matchanalyzer.users ALTER COLUMN id SET DEFAULT nextval('matchanalyzer.users_id_seq'::regclass);
 >   ALTER TABLE matchanalyzer.users ALTER COLUMN id DROP DEFAULT;
       matchanalyzer          matchanalyzer    false    227    226            �          0    16407    assists 
   TABLE DATA           `   COPY matchanalyzer.assists (id, type, goal, "matchId", matchpart, player, "userId") FROM stdin;
    matchanalyzer          matchanalyzer    false    204   _�       �          0    16412    cards 
   TABLE DATA           `   COPY matchanalyzer.cards (id, minute, type, player, "matchId", "userId", matchpart) FROM stdin;
    matchanalyzer          matchanalyzer    false    206   |�       �          0    16419    competitions 
   TABLE DATA           v   COPY matchanalyzer.competitions (id, name, season, discipline, category, manager, "signupDate", "userId") FROM stdin;
    matchanalyzer          matchanalyzer    false    208   ��       �          0    16425    goals 
   TABLE DATA           `   COPY matchanalyzer.goals (id, minute, type, player, "matchId", "userId", matchpart) FROM stdin;
    matchanalyzer          matchanalyzer    false    210   6�       �          0    16432    matches 
   TABLE DATA           �   COPY matchanalyzer.matches (id, "localTeam", "awayTeam", matchday, round, competition, "localTeamGoals", "awayTeamGoals", "userId") FROM stdin;
    matchanalyzer          matchanalyzer    false    212   ��       �          0    16437 
   matchparts 
   TABLE DATA           ]   COPY matchanalyzer.matchparts (id, "matchId", formation, "time", team, "userId") FROM stdin;
    matchanalyzer          matchanalyzer    false    214   ��       �          0    16442    minutes 
   TABLE DATA           `   COPY matchanalyzer.minutes (id, player, matchpart, "matchId", "userId", "position") FROM stdin;
    matchanalyzer          matchanalyzer    false    216   F�       �          0    16447    players 
   TABLE DATA           \   COPY matchanalyzer.players (id, name, avatar, year, team, "position", "userId") FROM stdin;
    matchanalyzer          matchanalyzer    false    218   ��       �          0    16457    rounds 
   TABLE DATA           N   COPY matchanalyzer.rounds (id, name, date, competition, "userId") FROM stdin;
    matchanalyzer          matchanalyzer    false    220   w�       �          0    16463    substitutions 
   TABLE DATA           q   COPY matchanalyzer.substitutions (id, "playerIn", "playerOut", minute, matchid, "userId", matchpart) FROM stdin;
    matchanalyzer          matchanalyzer    false    222   ��       �          0    16469    teams 
   TABLE DATA           n   COPY matchanalyzer.teams (id, name, avatar, "signupDate", manager, season, competition, "userId") FROM stdin;
    matchanalyzer          matchanalyzer    false    224   �       �          0    16479    users 
   TABLE DATA           �   COPY matchanalyzer.users (id, email, name, avatar, provider, provider_id, password, "signupDate", "lastLogin", role) FROM stdin;
    matchanalyzer          matchanalyzer    false    226   k�       �          0    16395    a 
   TABLE DATA           !   COPY public.a (name) FROM stdin;
    public          postgres    false    203   Y�       �           0    0    assists_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('matchanalyzer.assists_id_seq', 1, true);
          matchanalyzer          matchanalyzer    false    205            �           0    0    cards_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('matchanalyzer.cards_id_seq', 1, true);
          matchanalyzer          matchanalyzer    false    207            �           0    0    competitions_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('matchanalyzer.competitions_id_seq', 11, true);
          matchanalyzer          matchanalyzer    false    209            �           0    0    goals_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('matchanalyzer.goals_id_seq', 51, true);
          matchanalyzer          matchanalyzer    false    211            �           0    0    matches_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('matchanalyzer.matches_id_seq', 401, true);
          matchanalyzer          matchanalyzer    false    213            �           0    0    matchparts_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('matchanalyzer.matchparts_id_seq', 29, true);
          matchanalyzer          matchanalyzer    false    215            �           0    0    minutes_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('matchanalyzer.minutes_id_seq', 62, true);
          matchanalyzer          matchanalyzer    false    217            �           0    0    players_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('matchanalyzer.players_id_seq', 10, true);
          matchanalyzer          matchanalyzer    false    219            �           0    0    rounds_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('matchanalyzer.rounds_id_seq', 64, true);
          matchanalyzer          matchanalyzer    false    221                        0    0    substitutions_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('matchanalyzer.substitutions_id_seq', 11, true);
          matchanalyzer          matchanalyzer    false    223                       0    0    teams_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('matchanalyzer.teams_id_seq', 49, true);
          matchanalyzer          matchanalyzer    false    225                       0    0    users_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('matchanalyzer.users_id_seq', 15, true);
          matchanalyzer          matchanalyzer    false    227            �
           2606    16504    assists idx_16397_primary 
   CONSTRAINT     ^   ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT idx_16397_primary PRIMARY KEY (id);
 J   ALTER TABLE ONLY matchanalyzer.assists DROP CONSTRAINT idx_16397_primary;
       matchanalyzer            matchanalyzer    false    204            �
           2606    16506    cards idx_16403_primary 
   CONSTRAINT     \   ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT idx_16403_primary PRIMARY KEY (id);
 H   ALTER TABLE ONLY matchanalyzer.cards DROP CONSTRAINT idx_16403_primary;
       matchanalyzer            matchanalyzer    false    206            �
           2606    16508    competitions idx_16411_primary 
   CONSTRAINT     c   ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT idx_16411_primary PRIMARY KEY (id);
 O   ALTER TABLE ONLY matchanalyzer.competitions DROP CONSTRAINT idx_16411_primary;
       matchanalyzer            matchanalyzer    false    208            �
           2606    16510    goals idx_16418_primary 
   CONSTRAINT     \   ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT idx_16418_primary PRIMARY KEY (id);
 H   ALTER TABLE ONLY matchanalyzer.goals DROP CONSTRAINT idx_16418_primary;
       matchanalyzer            matchanalyzer    false    210                       2606    16512    matches idx_16426_primary 
   CONSTRAINT     ^   ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT idx_16426_primary PRIMARY KEY (id);
 J   ALTER TABLE ONLY matchanalyzer.matches DROP CONSTRAINT idx_16426_primary;
       matchanalyzer            matchanalyzer    false    212                       2606    16514    matchparts idx_16432_primary 
   CONSTRAINT     a   ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT idx_16432_primary PRIMARY KEY (id);
 M   ALTER TABLE ONLY matchanalyzer.matchparts DROP CONSTRAINT idx_16432_primary;
       matchanalyzer            matchanalyzer    false    214                       2606    16516    minutes idx_16438_primary 
   CONSTRAINT     ^   ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT idx_16438_primary PRIMARY KEY (id);
 J   ALTER TABLE ONLY matchanalyzer.minutes DROP CONSTRAINT idx_16438_primary;
       matchanalyzer            matchanalyzer    false    216                       2606    16518    players idx_16444_primary 
   CONSTRAINT     ^   ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT idx_16444_primary PRIMARY KEY (id);
 J   ALTER TABLE ONLY matchanalyzer.players DROP CONSTRAINT idx_16444_primary;
       matchanalyzer            matchanalyzer    false    218                       2606    16520    rounds idx_16455_primary 
   CONSTRAINT     ]   ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT idx_16455_primary PRIMARY KEY (id);
 I   ALTER TABLE ONLY matchanalyzer.rounds DROP CONSTRAINT idx_16455_primary;
       matchanalyzer            matchanalyzer    false    220                       2606    16522    substitutions idx_16462_primary 
   CONSTRAINT     d   ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT idx_16462_primary PRIMARY KEY (id);
 P   ALTER TABLE ONLY matchanalyzer.substitutions DROP CONSTRAINT idx_16462_primary;
       matchanalyzer            matchanalyzer    false    222            "           2606    16524    teams idx_16469_primary 
   CONSTRAINT     \   ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT idx_16469_primary PRIMARY KEY (id);
 H   ALTER TABLE ONLY matchanalyzer.teams DROP CONSTRAINT idx_16469_primary;
       matchanalyzer            matchanalyzer    false    224            '           2606    16526    users idx_16480_primary 
   CONSTRAINT     \   ALTER TABLE ONLY matchanalyzer.users
    ADD CONSTRAINT idx_16480_primary PRIMARY KEY (id);
 H   ALTER TABLE ONLY matchanalyzer.users DROP CONSTRAINT idx_16480_primary;
       matchanalyzer            matchanalyzer    false    226            �
           1259    16527    idx_16397_assist_goalid    INDEX     R   CREATE INDEX idx_16397_assist_goalid ON matchanalyzer.assists USING btree (goal);
 2   DROP INDEX matchanalyzer.idx_16397_assist_goalid;
       matchanalyzer            matchanalyzer    false    204            �
           1259    16528    idx_16397_assist_match    INDEX     V   CREATE INDEX idx_16397_assist_match ON matchanalyzer.assists USING btree ("matchId");
 1   DROP INDEX matchanalyzer.idx_16397_assist_match;
       matchanalyzer            matchanalyzer    false    204            �
           1259    16529    idx_16397_assist_matchpart    INDEX     Z   CREATE INDEX idx_16397_assist_matchpart ON matchanalyzer.assists USING btree (matchpart);
 5   DROP INDEX matchanalyzer.idx_16397_assist_matchpart;
       matchanalyzer            matchanalyzer    false    204            �
           1259    16530    idx_16397_assist_playerid    INDEX     V   CREATE INDEX idx_16397_assist_playerid ON matchanalyzer.assists USING btree (player);
 4   DROP INDEX matchanalyzer.idx_16397_assist_playerid;
       matchanalyzer            matchanalyzer    false    204            �
           1259    16531    idx_16397_assist_userid    INDEX     V   CREATE INDEX idx_16397_assist_userid ON matchanalyzer.assists USING btree ("userId");
 2   DROP INDEX matchanalyzer.idx_16397_assist_userid;
       matchanalyzer            matchanalyzer    false    204            �
           1259    16532    idx_16403_card_matchid    INDEX     T   CREATE INDEX idx_16403_card_matchid ON matchanalyzer.cards USING btree ("matchId");
 1   DROP INDEX matchanalyzer.idx_16403_card_matchid;
       matchanalyzer            matchanalyzer    false    206            �
           1259    16533    idx_16403_card_matchpartid    INDEX     X   CREATE INDEX idx_16403_card_matchpartid ON matchanalyzer.cards USING btree (matchpart);
 5   DROP INDEX matchanalyzer.idx_16403_card_matchpartid;
       matchanalyzer            matchanalyzer    false    206            �
           1259    16534    idx_16403_card_playerid    INDEX     R   CREATE INDEX idx_16403_card_playerid ON matchanalyzer.cards USING btree (player);
 2   DROP INDEX matchanalyzer.idx_16403_card_playerid;
       matchanalyzer            matchanalyzer    false    206            �
           1259    16535    idx_16403_card_userid    INDEX     R   CREATE INDEX idx_16403_card_userid ON matchanalyzer.cards USING btree ("userId");
 0   DROP INDEX matchanalyzer.idx_16403_card_userid;
       matchanalyzer            matchanalyzer    false    206            �
           1259    16536    idx_16411_competition_managerid    INDEX     b   CREATE INDEX idx_16411_competition_managerid ON matchanalyzer.competitions USING btree (manager);
 :   DROP INDEX matchanalyzer.idx_16411_competition_managerid;
       matchanalyzer            matchanalyzer    false    208            �
           1259    16537    idx_16411_competition_userid    INDEX     `   CREATE INDEX idx_16411_competition_userid ON matchanalyzer.competitions USING btree ("userId");
 7   DROP INDEX matchanalyzer.idx_16411_competition_userid;
       matchanalyzer            matchanalyzer    false    208            �
           1259    16538    idx_16411_name    INDEX     U   CREATE UNIQUE INDEX idx_16411_name ON matchanalyzer.competitions USING btree (name);
 )   DROP INDEX matchanalyzer.idx_16411_name;
       matchanalyzer            matchanalyzer    false    208            �
           1259    16539    idx_16418_goal_matchid    INDEX     T   CREATE INDEX idx_16418_goal_matchid ON matchanalyzer.goals USING btree ("matchId");
 1   DROP INDEX matchanalyzer.idx_16418_goal_matchid;
       matchanalyzer            matchanalyzer    false    210            �
           1259    16540    idx_16418_goal_matchpartid    INDEX     X   CREATE INDEX idx_16418_goal_matchpartid ON matchanalyzer.goals USING btree (matchpart);
 5   DROP INDEX matchanalyzer.idx_16418_goal_matchpartid;
       matchanalyzer            matchanalyzer    false    210            �
           1259    16541    idx_16418_goal_playerid    INDEX     R   CREATE INDEX idx_16418_goal_playerid ON matchanalyzer.goals USING btree (player);
 2   DROP INDEX matchanalyzer.idx_16418_goal_playerid;
       matchanalyzer            matchanalyzer    false    210            �
           1259    16542    idx_16418_goal_userid    INDEX     R   CREATE INDEX idx_16418_goal_userid ON matchanalyzer.goals USING btree ("userId");
 0   DROP INDEX matchanalyzer.idx_16418_goal_userid;
       matchanalyzer            matchanalyzer    false    210                        1259    16543    idx_16426_match_awayteamid    INDEX     [   CREATE INDEX idx_16426_match_awayteamid ON matchanalyzer.matches USING btree ("awayTeam");
 5   DROP INDEX matchanalyzer.idx_16426_match_awayteamid;
       matchanalyzer            matchanalyzer    false    212                       1259    16544    idx_16426_match_competitionid    INDEX     _   CREATE INDEX idx_16426_match_competitionid ON matchanalyzer.matches USING btree (competition);
 8   DROP INDEX matchanalyzer.idx_16426_match_competitionid;
       matchanalyzer            matchanalyzer    false    212                       1259    16545    idx_16426_match_localteamid    INDEX     ]   CREATE INDEX idx_16426_match_localteamid ON matchanalyzer.matches USING btree ("localTeam");
 6   DROP INDEX matchanalyzer.idx_16426_match_localteamid;
       matchanalyzer            matchanalyzer    false    212                       1259    16546    idx_16426_match_roundid    INDEX     S   CREATE INDEX idx_16426_match_roundid ON matchanalyzer.matches USING btree (round);
 2   DROP INDEX matchanalyzer.idx_16426_match_roundid;
       matchanalyzer            matchanalyzer    false    212                       1259    16547    idx_16426_match_userid    INDEX     U   CREATE INDEX idx_16426_match_userid ON matchanalyzer.matches USING btree ("userId");
 1   DROP INDEX matchanalyzer.idx_16426_match_userid;
       matchanalyzer            matchanalyzer    false    212                       1259    16548    idx_16432_matchpart_match    INDEX     \   CREATE INDEX idx_16432_matchpart_match ON matchanalyzer.matchparts USING btree ("matchId");
 4   DROP INDEX matchanalyzer.idx_16432_matchpart_match;
       matchanalyzer            matchanalyzer    false    214                       1259    16549    idx_16432_matchpart_team    INDEX     V   CREATE INDEX idx_16432_matchpart_team ON matchanalyzer.matchparts USING btree (team);
 3   DROP INDEX matchanalyzer.idx_16432_matchpart_team;
       matchanalyzer            matchanalyzer    false    214            	           1259    16550    idx_16432_matchpart_userid    INDEX     \   CREATE INDEX idx_16432_matchpart_userid ON matchanalyzer.matchparts USING btree ("userId");
 5   DROP INDEX matchanalyzer.idx_16432_matchpart_userid;
       matchanalyzer            matchanalyzer    false    214                       1259    16551    idx_16438_minute_matchid    INDEX     X   CREATE INDEX idx_16438_minute_matchid ON matchanalyzer.minutes USING btree ("matchId");
 3   DROP INDEX matchanalyzer.idx_16438_minute_matchid;
       matchanalyzer            matchanalyzer    false    216                       1259    16552    idx_16438_minute_matchpartid    INDEX     \   CREATE INDEX idx_16438_minute_matchpartid ON matchanalyzer.minutes USING btree (matchpart);
 7   DROP INDEX matchanalyzer.idx_16438_minute_matchpartid;
       matchanalyzer            matchanalyzer    false    216                       1259    16553    idx_16438_minute_playerid    INDEX     V   CREATE INDEX idx_16438_minute_playerid ON matchanalyzer.minutes USING btree (player);
 4   DROP INDEX matchanalyzer.idx_16438_minute_playerid;
       matchanalyzer            matchanalyzer    false    216                       1259    16554    idx_16438_minute_userid    INDEX     V   CREATE INDEX idx_16438_minute_userid ON matchanalyzer.minutes USING btree ("userId");
 2   DROP INDEX matchanalyzer.idx_16438_minute_userid;
       matchanalyzer            matchanalyzer    false    216                       1259    16555    idx_16444_player_teamid    INDEX     R   CREATE INDEX idx_16444_player_teamid ON matchanalyzer.players USING btree (team);
 2   DROP INDEX matchanalyzer.idx_16444_player_teamid;
       matchanalyzer            matchanalyzer    false    218                       1259    16556    idx_16444_player_userid    INDEX     V   CREATE INDEX idx_16444_player_userid ON matchanalyzer.players USING btree ("userId");
 2   DROP INDEX matchanalyzer.idx_16444_player_userid;
       matchanalyzer            matchanalyzer    false    218                       1259    16557    idx_16455_round_competitionid    INDEX     ^   CREATE INDEX idx_16455_round_competitionid ON matchanalyzer.rounds USING btree (competition);
 8   DROP INDEX matchanalyzer.idx_16455_round_competitionid;
       matchanalyzer            matchanalyzer    false    220                       1259    16558    idx_16455_round_userid    INDEX     T   CREATE INDEX idx_16455_round_userid ON matchanalyzer.rounds USING btree ("userId");
 1   DROP INDEX matchanalyzer.idx_16455_round_userid;
       matchanalyzer            matchanalyzer    false    220                       1259    16559    idx_16462_substitution_match    INDEX     `   CREATE INDEX idx_16462_substitution_match ON matchanalyzer.substitutions USING btree (matchid);
 7   DROP INDEX matchanalyzer.idx_16462_substitution_match;
       matchanalyzer            matchanalyzer    false    222                       1259    16560     idx_16462_substitution_matchpart    INDEX     f   CREATE INDEX idx_16462_substitution_matchpart ON matchanalyzer.substitutions USING btree (matchpart);
 ;   DROP INDEX matchanalyzer.idx_16462_substitution_matchpart;
       matchanalyzer            matchanalyzer    false    222                       1259    16561    idx_16462_substitution_playerin    INDEX     f   CREATE INDEX idx_16462_substitution_playerin ON matchanalyzer.substitutions USING btree ("playerIn");
 :   DROP INDEX matchanalyzer.idx_16462_substitution_playerin;
       matchanalyzer            matchanalyzer    false    222                       1259    16562     idx_16462_substitution_playerout    INDEX     h   CREATE INDEX idx_16462_substitution_playerout ON matchanalyzer.substitutions USING btree ("playerOut");
 ;   DROP INDEX matchanalyzer.idx_16462_substitution_playerout;
       matchanalyzer            matchanalyzer    false    222                        1259    16563    idx_16462_substitution_userid    INDEX     b   CREATE INDEX idx_16462_substitution_userid ON matchanalyzer.substitutions USING btree ("userId");
 8   DROP INDEX matchanalyzer.idx_16462_substitution_userid;
       matchanalyzer            matchanalyzer    false    222            #           1259    16564    idx_16469_team_competitionid    INDEX     \   CREATE INDEX idx_16469_team_competitionid ON matchanalyzer.teams USING btree (competition);
 7   DROP INDEX matchanalyzer.idx_16469_team_competitionid;
       matchanalyzer            matchanalyzer    false    224            $           1259    16565    idx_16469_team_userid    INDEX     R   CREATE INDEX idx_16469_team_userid ON matchanalyzer.teams USING btree ("userId");
 0   DROP INDEX matchanalyzer.idx_16469_team_userid;
       matchanalyzer            matchanalyzer    false    224            %           1259    16566    idx_16480_email    INDEX     P   CREATE UNIQUE INDEX idx_16480_email ON matchanalyzer.users USING btree (email);
 *   DROP INDEX matchanalyzer.idx_16480_email;
       matchanalyzer            matchanalyzer    false    226            (           2606    16567    assists assist_goalid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_goalid FOREIGN KEY (goal) REFERENCES matchanalyzer.goals(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY matchanalyzer.assists DROP CONSTRAINT assist_goalid;
       matchanalyzer          matchanalyzer    false    2815    204    210            )           2606    16572    assists assist_match    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY matchanalyzer.assists DROP CONSTRAINT assist_match;
       matchanalyzer          matchanalyzer    false    2822    212    204            *           2606    16577    assists assist_matchpart    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_matchpart FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY matchanalyzer.assists DROP CONSTRAINT assist_matchpart;
       matchanalyzer          matchanalyzer    false    214    2827    204            +           2606    16582    assists assist_playerid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY matchanalyzer.assists DROP CONSTRAINT assist_playerid;
       matchanalyzer          matchanalyzer    false    2837    218    204            ,           2606    16587    assists assist_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.assists
    ADD CONSTRAINT assist_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY matchanalyzer.assists DROP CONSTRAINT assist_userid;
       matchanalyzer          matchanalyzer    false    204    226    2855            -           2606    16592    cards card_matchid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_matchid FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY matchanalyzer.cards DROP CONSTRAINT card_matchid;
       matchanalyzer          matchanalyzer    false    212    2822    206            .           2606    16597    cards card_matchpartid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_matchpartid FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY matchanalyzer.cards DROP CONSTRAINT card_matchpartid;
       matchanalyzer          matchanalyzer    false    206    214    2827            /           2606    16602    cards card_playerid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE SET NULL;
 D   ALTER TABLE ONLY matchanalyzer.cards DROP CONSTRAINT card_playerid;
       matchanalyzer          matchanalyzer    false    218    2837    206            0           2606    16607    cards card_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.cards
    ADD CONSTRAINT card_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY matchanalyzer.cards DROP CONSTRAINT card_userid;
       matchanalyzer          matchanalyzer    false    226    2855    206            1           2606    16612 "   competitions competition_managerid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT competition_managerid FOREIGN KEY (manager) REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY matchanalyzer.competitions DROP CONSTRAINT competition_managerid;
       matchanalyzer          matchanalyzer    false    208    2855    226            2           2606    16617    competitions competition_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.competitions
    ADD CONSTRAINT competition_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY matchanalyzer.competitions DROP CONSTRAINT competition_userid;
       matchanalyzer          matchanalyzer    false    226    208    2855            3           2606    16622    goals goal_matchid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_matchid FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY matchanalyzer.goals DROP CONSTRAINT goal_matchid;
       matchanalyzer          matchanalyzer    false    212    210    2822            4           2606    16627    goals goal_matchpartid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_matchpartid FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY matchanalyzer.goals DROP CONSTRAINT goal_matchpartid;
       matchanalyzer          matchanalyzer    false    2827    210    214            5           2606    16632    goals goal_playerid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY matchanalyzer.goals DROP CONSTRAINT goal_playerid;
       matchanalyzer          matchanalyzer    false    210    218    2837            6           2606    16637    goals goal_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.goals
    ADD CONSTRAINT goal_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY matchanalyzer.goals DROP CONSTRAINT goal_userid;
       matchanalyzer          matchanalyzer    false    210    226    2855            7           2606    16642    matches match_awayteamid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_awayteamid FOREIGN KEY ("awayTeam") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY matchanalyzer.matches DROP CONSTRAINT match_awayteamid;
       matchanalyzer          matchanalyzer    false    212    224    2850            8           2606    16647    matches match_competitionid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_competitionid FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY matchanalyzer.matches DROP CONSTRAINT match_competitionid;
       matchanalyzer          matchanalyzer    false    212    2809    208            9           2606    16652    matches match_localteamid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_localteamid FOREIGN KEY ("localTeam") REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY matchanalyzer.matches DROP CONSTRAINT match_localteamid;
       matchanalyzer          matchanalyzer    false    2850    212    224            :           2606    16657    matches match_roundid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_roundid FOREIGN KEY (round) REFERENCES matchanalyzer.rounds(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY matchanalyzer.matches DROP CONSTRAINT match_roundid;
       matchanalyzer          matchanalyzer    false    2839    220    212            ;           2606    16662    matches match_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matches
    ADD CONSTRAINT match_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY matchanalyzer.matches DROP CONSTRAINT match_userid;
       matchanalyzer          matchanalyzer    false    2855    226    212            <           2606    16667    matchparts matchpart_match    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_match FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY matchanalyzer.matchparts DROP CONSTRAINT matchpart_match;
       matchanalyzer          matchanalyzer    false    2822    212    214            =           2606    16672    matchparts matchpart_team    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_team FOREIGN KEY (team) REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY matchanalyzer.matchparts DROP CONSTRAINT matchpart_team;
       matchanalyzer          matchanalyzer    false    224    2850    214            >           2606    16677    matchparts matchpart_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.matchparts
    ADD CONSTRAINT matchpart_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY matchanalyzer.matchparts DROP CONSTRAINT matchpart_userid;
       matchanalyzer          matchanalyzer    false    226    214    2855            ?           2606    16682    minutes minute_matchid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_matchid FOREIGN KEY ("matchId") REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY matchanalyzer.minutes DROP CONSTRAINT minute_matchid;
       matchanalyzer          matchanalyzer    false    216    2822    212            @           2606    16687    minutes minute_matchpartid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_matchpartid FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY matchanalyzer.minutes DROP CONSTRAINT minute_matchpartid;
       matchanalyzer          matchanalyzer    false    216    214    2827            A           2606    16692    minutes minute_playerid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_playerid FOREIGN KEY (player) REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY matchanalyzer.minutes DROP CONSTRAINT minute_playerid;
       matchanalyzer          matchanalyzer    false    2837    218    216            B           2606    16697    minutes minute_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.minutes
    ADD CONSTRAINT minute_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY matchanalyzer.minutes DROP CONSTRAINT minute_userid;
       matchanalyzer          matchanalyzer    false    2855    216    226            C           2606    16702    players player_teamid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT player_teamid FOREIGN KEY (team) REFERENCES matchanalyzer.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY matchanalyzer.players DROP CONSTRAINT player_teamid;
       matchanalyzer          matchanalyzer    false    2850    218    224            D           2606    16707    players player_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.players
    ADD CONSTRAINT player_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY matchanalyzer.players DROP CONSTRAINT player_userid;
       matchanalyzer          matchanalyzer    false    2855    218    226            E           2606    16712    rounds round_competitionid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT round_competitionid FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY matchanalyzer.rounds DROP CONSTRAINT round_competitionid;
       matchanalyzer          matchanalyzer    false    220    2809    208            F           2606    16717    rounds round_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.rounds
    ADD CONSTRAINT round_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY matchanalyzer.rounds DROP CONSTRAINT round_userid;
       matchanalyzer          matchanalyzer    false    226    2855    220            G           2606    16722     substitutions substitution_match    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_match FOREIGN KEY (matchid) REFERENCES matchanalyzer.matches(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY matchanalyzer.substitutions DROP CONSTRAINT substitution_match;
       matchanalyzer          matchanalyzer    false    2822    212    222            H           2606    16727 $   substitutions substitution_matchpart    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_matchpart FOREIGN KEY (matchpart) REFERENCES matchanalyzer.matchparts(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY matchanalyzer.substitutions DROP CONSTRAINT substitution_matchpart;
       matchanalyzer          matchanalyzer    false    214    222    2827            I           2606    16732 #   substitutions substitution_playerin    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_playerin FOREIGN KEY ("playerIn") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY matchanalyzer.substitutions DROP CONSTRAINT substitution_playerin;
       matchanalyzer          matchanalyzer    false    2837    218    222            J           2606    16737 $   substitutions substitution_playerout    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_playerout FOREIGN KEY ("playerOut") REFERENCES matchanalyzer.players(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY matchanalyzer.substitutions DROP CONSTRAINT substitution_playerout;
       matchanalyzer          matchanalyzer    false    218    2837    222            K           2606    16742 !   substitutions substitution_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.substitutions
    ADD CONSTRAINT substitution_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY matchanalyzer.substitutions DROP CONSTRAINT substitution_userid;
       matchanalyzer          matchanalyzer    false    226    222    2855            L           2606    16747    teams team_competitionid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT team_competitionid FOREIGN KEY (competition) REFERENCES matchanalyzer.competitions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY matchanalyzer.teams DROP CONSTRAINT team_competitionid;
       matchanalyzer          matchanalyzer    false    2809    208    224            M           2606    16752    teams team_userid    FK CONSTRAINT     �   ALTER TABLE ONLY matchanalyzer.teams
    ADD CONSTRAINT team_userid FOREIGN KEY ("userId") REFERENCES matchanalyzer.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY matchanalyzer.teams DROP CONSTRAINT team_userid;
       matchanalyzer          matchanalyzer    false    226    224    2855            �      x������ � �      �      x������ � �      �   �   x�m�1
�0����)�K�����$� �.
R�bo��z1�nVx燷�v?��4,�����A��ҵ�����9�*�i2�̰Q�7[��� �H��)Zf���%�7��T��@�����cه�S�P�X�ce�yCK8�      �   �   x�]��� ��0̥��M���8PZ���5O��B*�_(W<DHzP_bP��щ��J�I�\���Ef��$��bK4�b��j����f���lk�A�ܳQ_��#˭���J��x^���Q�"Kt��&�䭫����[/s��rV���I�����?;cE�      �     x�uZI�,�\g��}��.���hp'�@"�z��< �R��'�����E������ɟ�Wǿ$:T>q�ca��84
�M�'���4��_�n�0�qh�Hsp��!A������sg��/8A-l��Rc�	�ypT�i���嗗�����1p�'�-{Wg�X����z�4������|e������0��ߘ-�lX��9:xm��U�3�:-������3���
���#ٲ-�g�K���KyD�0�2.-����F��`�I���
:u����V�0y\��2-��o�!zn^!�4�"F�K*O�0�L�� ���ypy�b�<�(	�\`�D��_0Y�� ���zO�xj��'�hwp�ލ&s�2B�С=F�a�����I��(��}�-R/�c5�f<ڟ����fn����E'O���gW��8�v��#.ȸ��lfR.$[�H�V;���'�@��`J^Xj���i��Z=��d8�_VO��2���\L��q6J�I��Xa V��d�:O56`��Uv0�^ɵ���Wx���:������yeb�0[e%W�(/�Ͻ�ޞp����ոt�����A��hl"Ď�bM���ٍ\�Vc���Fnx�G�`�hɶG��Х�����j�0Jq0�CcJm�Vw$��a��r0��_�0i����w���&=7�ΰ��!����o��qt0]֙:������6
as8�����t4��F���
N�������g��l���Ɛy)0j��z�,	F`���@�W�QCF��/lK�ȵ��W4�#'�������U��:(:
g
��q�lw^x�O�:�;|�C��k��A�ګ^p\)fwѧ�K�6���p���s�{R��~�{xG���?>�=-<�29�4�G���R�paq�r�`�ta������I!
���P�z<)��s���!�N�"p�?���g��J
z|!�� p�~�x��zYOM�&C|P��yZ���#@N
 g���I�4� �( cX^��_C �<�K�H` �?Wk@�"��~�����s}��1��\l�p04�z-�~�#�=���@���2����\Fo?�7�m�� _!0��ɐ|�(,t
�v�ʐ�x8m����:��!�ß$����$����7y�V�f�x�дS���"�C
�3̈ �?��i����z��88o�F���
_�)`�!P���S�����`�)P.�����a���O����F�?Str��4�ӿ����� ���������2��?Gӟ\�);�G�?3����"|ڿ����5��;���fy��F����8z�Y#��ٽǆ�gTAP�!:�뮑=�z�PB�N ���I_�!:��S$p���zʇ�0z�?� 3@�e8��G3f���퍇^
t�ƀ�(p�l�(`Fk�v�-��`�E��O����3�;�Ud�(��w�q���ׅ��9-�V���N��XPz��������pX�pYP�\�'NV��+-���/���N�1���ٌ�*���"��n�$��F��$A�,"zY����O���6@
<�8�Q� U"�T �1�'IHD�M�$)�W�l=��@4��b���d<��<4҆!� h��i�DpKP�~�� h����	�쯛��?�~l�"?�M�0H_@f��<Q4�����YQ\���t����1֧�fH��� J���UQX�E�sUE61��DQ�1��_�d���A��CAZ�D�k�D�
���a���	�80o&d`����^�%��6a������1[mJ��	}�!H�Jȁ���O�yk��# �d��>M�ou��� 0,������P���?����#$3��z�.�(��,��8������Ϋ�����@l�F�\�x9��"b��!_����?r>�����N::|�\q�2ฉ$W��KATX����'�7n�M@*�gԞ��T�G���)ʸ�h�f�����!�79��[I@uxX�ї���Tt1��|N��+
�q�~���6�{��*�i�v�hx�9��N�ڟZ8�5�tp���=|=�J�[��+ :�_}^c����>,��s�t4�'r��a��m�㞥~�0:kH��������FY7��%
���C>��8�]SDG�R��8�@��Ϝ�`X���bX�k�!�A�_��SJ��u>�B��I�����1x� ���cn# (un���q�>IL��Ǘ#�Hp,"��˂�}LtxY8_TO�>I#R�� �۠`dS����zY��^����(kDV/ߚ��|Nȗ��O���|8����Ĩ
�k��:��
�c���Sa'���)�C���*x�N^�5y$�#��A�'iq8�SA6.��>�Lv0M��gEC��J*s��٨���x��>i�� � #���l�_E��a�G�e\X�VUIP��d��.�/�3ř�����Y�]6��������%��1.ޏ��𛒡P�L��\?��߼�4qX!9<��睪�`�ɝ|9 H݉�p>�j��N,�D�f�x|e���c�X�f�F^'5c&��������3���Pd�E��(�^?���s��\�S���E>�֋g���62o�頂���2����o������#��Sr8�a-��-��<��z�r>�LH���˚�q��o�Pl|��_�x>�;�|#4'�p~�@�K�/�%�5y��s�B� Tp�jd*�f�×���N��?��,T���O�T��ύ/�T����Gz�KZ9��_��4ntx�}f_���gz)?q��=�q^������Rl�@UL�`��yϯ��h�
�`�F�W�/�J�\�H0P�0l��#B���o'��8�Xh�qQ�c���[B�����qYN��t�v�K�R@�`Wq�
�����X�;$傃���R̜�
�o���R�o��:�/�)``�%?+җ��������nd8      �   8   x�32�44�4�5�2L9�9M������`3�"fb���c��"f�)���� �
)      �   .  x�Uӽn�0��z��I����:d��?Gy�}t'����v�TiM�!&����bq��糸��e0~=��ݕ��R��Ya)�j��XuQ��j��*u�d�N�ל��y��F0vQ� ��`�z�Wi��F�u������	��[(���+���6xNOw��  54�e�%�����(xf���N�r�����ou/p;h A��� h�A�_� h��	�#�O,t�ޤ��I�+
Nz�Pp�s�7�a��������\	Z	N�+�p�{�E�WZ���"��G)�v�R      �   �   x���MN�0����>A���˒JԠ"� �i�#��n�6���#�b8��]���Pc�^pK�9�)9ܙ0=�?��x�<_B1���E6���4�Y�=j�:U����+�Swd�������
}�*�d-&��:�+����'/<|�T��5�bǤ��G��7���7ZTC]7�r"�ʈo�Y��#7�SWu�Kh�8b�$�D��Eo�ƻz$7����D�O�,�\̾�      �   $  x�m�An�0D�5�" r���}��!����H��"Fn��/!�(,y�z��>~�h���n)/y�Ul4��eje4������h�Zmo�F��d�FM��i�~�3N0!�w�8�4��$��b�Wۗr���rRl��H�e �f@�́[Rl;�b�H��ݒ^тF���FǦoL:6}c���i d$$d!�$d!�$d�vH�CHI�CHI�CHI�CHIȧ���<���<���<�2	y�[B�<�<owK��vĒx	�*�+
/�_�c���x�3f^B�R���z�g��\����+�      �   F   x�M���0C��0Q�!�]��5�		޳�ab���a�0��(|���皐�,9(�U��F1o#��0      �   Z  x���;��H��_��d1t��Z��{��Cg'-�����1�l䟤?��ƻ��5�F�>ݪ{�6�$�"�p?<���8�!Nj��{"�����<���ˡ훲���5G��ZP�0�F�\z��`Pb�z`1�uG-��.~�gI�s��}p����JA�u=�f��i��G�:g��[� �q�V�D�-=�9�瑶.~� C���'��rT�K}�?��,O��(_1i�z��$<�����晵OE����Nè��R�2T��<�.ܼY����Z8D?A���"_�練r���8��G�����0�!��`��� ���\�����mW3�!�Iʱ�e��ݣ�1�lf�B��P�M ���Z�򹄅�M϶T,�MXl��1N��8��C�v%F��41��̃"���}���r��N�)�!�K쐤X�Bp<������g����"
��V�	A؅�c�����j<��pм.�_���ޕ�;L3�D�r<��5��䵟7����晱0肺�ӂ�06��NҙY�lu__��Dq���
|���w�p&ɃT�g��������˾.�o�\�� S���ɗŴ��P�60=�iz�x5��b�}_�2m�pU�C�x��ѹ��*�.��j~��вU�K}��:/�nS6Px=�r�(\^?C�����F|�� ��搣��ߠ�+h��X����ۃ��l�z_K|��g�~[��p�ѣ���<T�Q��)ȥg����KY����j�b�4���[�ٞ�BKO?�
kyG�G�0�V?�5�7�[����;z���U)_�g �mH|�����h�Gٷ8�vT��>�WH�� ��www� ㏰�      �   �  x����r�@�5>�w);�4��JB��CDSٴ�*JC@@��9���J�O2���n����խC�u�S���-�~ ��k$<[B�iP-��la�����<�<�5pJg������\J���q6��gk�H[�h\!R�HlC��DU�U"�@�#�D�
;*!u�Y�@���8M�;Ҡ(Yr�]�l/7��.��8�����0X�n0�OE��ҍ��Q�l��3�M�mH�6��B���ߖ7P5��
&Y�4Y��#�a,%���R��|q��\ȼ�5��|����˩�3�bv����N}�T�U�JG���o�.�/!P�=(�|�4�~vH��V�o��^�ai�luO���;�����t�+l� �� 5���oR!����n���ǩ?�M��8�N4�=Hv0�Hy�&����)�� !T+��t�I�I�T�J���3��P�#�V5R ������+���      �      x������ � �     