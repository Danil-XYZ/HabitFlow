function HabitFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <section className="panel filters-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-label">Поиск и фильтрация</p>
          <h2>Список привычек</h2>
        </div>
      </div>

      <div className="filters-grid">
        <label>
          Поиск
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Введите название привычки"
          />
        </label>

        <label>
          Статус
          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="all">Все</option>
            <option value="done">Выполненные сегодня</option>
            <option value="active">Невыполненные сегодня</option>
          </select>
        </label>
      </div>
    </section>
  )
}

export default HabitFilters
