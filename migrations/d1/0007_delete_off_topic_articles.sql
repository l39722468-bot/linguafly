-- Linguafly solo trata de aprender inglés: se eliminan los artículos de
-- alimentación, entrenamiento, fitness e inteligencia artificial.
-- Las URLs públicas responden 410 Gone desde el middleware.
DELETE FROM article_tags WHERE article_id IN (
  SELECT id FROM articles WHERE category IN ('alimentacion', 'entrenamiento', 'fitness', 'inteligencia-artificial')
);
DELETE FROM article_analytics WHERE article_id IN (
  SELECT id FROM articles WHERE category IN ('alimentacion', 'entrenamiento', 'fitness', 'inteligencia-artificial')
);
DELETE FROM articles_fts WHERE category IN ('alimentacion', 'entrenamiento', 'fitness', 'inteligencia-artificial');
DELETE FROM articles WHERE category IN ('alimentacion', 'entrenamiento', 'fitness', 'inteligencia-artificial');
