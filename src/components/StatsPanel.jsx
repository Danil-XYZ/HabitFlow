function StatsPanel({ total, completed }) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <section className="panel stats-panel">
      <p className="panel-label">Статистика на сегодня</p>
      <div className="stats-grid">
        <div>
          <span className="stat-value">{total}</span>
          <span className="stat-label">Всего привычек</span>
        </div>
        <div>
          <span className="stat-value">{completed}</span>
          <span className="stat-label">Выполнено</span>
        </div>
        <div>
          <span className="stat-value">{progress}%</span>
          <span className="stat-label">Прогресс</span>
        </div>
      </div>
    </section>
  )
}

export default StatsPanel
