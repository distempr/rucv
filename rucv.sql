CREATE TABLE speaker (id INTEGER PRIMARY KEY, cv_id TEXT UNIQUE, gender TEXT, total_upvotes INTEGER, total_downvotes INTEGER);
CREATE TABLE sentence (id INTEGER PRIMARY KEY, content TEXT, selected INTEGER, score INTEGER, filename TEXT, crc INTEGER, speaker INTEGER, upvotes INTEGER, downvotes INTEGER, UNIQUE(crc, speaker));
CREATE TABLE frequency (id INTEGER PRIMARY KEY, lemma TEXT, rank INTEGER, pos TEXT, frequency REAL);
