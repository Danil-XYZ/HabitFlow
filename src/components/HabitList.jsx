import HabitItem from './HabitItem'

function HabitList({ habits, onToggleHabit, onEditHabit, onDeleteHabit }) {
  return (
    <section className="panel list-content">
      {habits.length > 0 ? (
        <div className="habit-list">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggleHabit={onToggleHabit}
              onEditHabit={onEditHabit}
              onDeleteHabit={onDeleteHabit}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить строку поиска или добавить новую привычку.</p>
        </div>
      )}
    </section>
  )
}

export default HabitList
