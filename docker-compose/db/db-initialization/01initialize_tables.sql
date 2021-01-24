CREATE TABLE public.leadinfo (
	id uuid NOT NULL,
	fullname varchar(40) NOT NULL,
	company varchar(40) NOT NULL,
	contact_number varchar(15) NOT NULL,
	country varchar(20) NOT NULL,
	query varchar(50) NOT NULL,
	query_description varchar(250) NOT NULL,
	email varchar(40) NOT NULL,
	inserted_at timestamp(0) NOT NULL,
	CONSTRAINT leadinfo_pkey PRIMARY KEY (id)
);