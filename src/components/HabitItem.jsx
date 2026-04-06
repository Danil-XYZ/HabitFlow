function HabitItem({ habit, onToggleHabit, onEditHabit, onDeleteHabit }) {
  return (
    <article className={`habit-card ${habit.doneToday ? 'completed' : ''}`}>
      <div className="habit-main">
        <div className="habit-title-row">
          <h3>{habit.title}</h3>
          <span className="category-chip">{habit.category}</span>
        </div>
        <p className="habit-meta">
          Серия: <strong>{habit.streak}</strong> дн.
        </p>
        <p className="habit-status">
          {habit.doneToday ? 'Выполнено сегодня' : 'Еще не выполнено сегодня'}
        </p>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="primary-button"
          onClick={() => onToggleHabit(habit.id)}
        >
          {habit.doneToday ? 'Отменить отметку' : 'Отметить'}
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => onEditHabit(habit)}
        >
          Изменить
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={() => onDeleteHabit(habit.id)}
        >
          Удалить
        </button>
      </div>
    </article>
  )
}

export default HabitItem
