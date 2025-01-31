CREATE TABLE IF NOT EXISTS games (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game TEXT,
  review TEXT
);

-- Primary key means unique column for the table
-- generated as identity means 'something new is added to the table and generate an id for that'

-- Insert pg_stat_statements
-- next statement creates a table

INSERT INTO games(game, review) VALUES 
('The Witcher 3', 'Words can simply not describe how much I love this game'),
('Escape From Tarkov', 'Im so poor and terrified of losing what meager wealth Ive acquired that most times Im headed into a raid with just a pistol and a dream. Even after 15 hours, Ive failed to survive a single proper raid.'),
('God of War Ragnarok', 'The expectations and the bar for GoW Ragnarok was so high and almost impossible to reach because God Of War (2018) ended up being one of the greatest game of all time and sequels of projects historically ends up being a bit toned down. But its safe to say that they knocked the ball out of the park and gave this series a new height with this one. ')