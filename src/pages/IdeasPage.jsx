function IdeasPage({ ideas, status, error, habitCount, onAddIdea }) {
  return (
    <section className="ideas-page">
      <div className="page-heading">
        <p className="eyebrow">API</p>
        <h1>Идеи для новых привычек</h1>
        <p className="hero-text">
          Сейчас в трекере {habitCount} привычек. Готовые идеи можно добавить в
          общий список и продолжить работу на странице трекера.
        </p>
      </div>

      {status === 'loading' && (
        <section className="panel state-panel">
          <h2>Загрузка идей</h2>
          <p>Получаем данные из внешнего API.</p>
        </section>
      )}

      {error && (
        <section className="panel state-panel warning-panel">
          <h2>API временно недоступен</h2>
          <p>{error}</p>
        </section>
      )}

      {status !== 'loading' && (
        <div className="ideas-grid">
          {ideas.map((idea) => (
            <article className="panel idea-card" key={idea.id}>
              <div>
                <span className="category-chip">{idea.category}</span>
                <h2>{idea.title}</h2>
                <p className="idea-source">Источник API: {idea.sourceTitle}</p>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() => onAddIdea(idea)}
              >
                Добавить в трекер
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default IdeasPage
