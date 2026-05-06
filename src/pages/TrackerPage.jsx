import HabitFilters from '../components/HabitFilters'
import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'
import StatsPanel from '../components/StatsPanel'

function TrackerPage({
  habits,
  filteredHabits,
  completedCount,
  searchTerm,
  statusFilter,
  editingHabit,
  onSaveHabit,
  onCancelEdit,
  onSearchChange,
  onStatusChange,
  onToggleHabit,
  onEditHabit,
  onDeleteHabit,
}) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Индивидуальный mini-project</p>
          <h1>Habit Flow</h1>
          <p className="hero-text">
            Трекер привычек с добавлением, редактированием, поиском,
            фильтрацией и сохранением прогресса в браузере.
          </p>
        </div>
        <StatsPanel total={habits.length} completed={completedCount} />
      </section>

      <section className="content-grid">
        <HabitForm
          key={editingHabit ? editingHabit.id : 'new-habit'}
          editingHabit={editingHabit}
          onSaveHabit={onSaveHabit}
          onCancelEdit={onCancelEdit}
        />

        <div className="list-panel">
          <HabitFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={onSearchChange}
            onStatusChange={onStatusChange}
          />

          <HabitList
            habits={filteredHabits}
            onToggleHabit={onToggleHabit}
            onEditHabit={onEditHabit}
            onDeleteHabit={onDeleteHabit}
          />
        </div>
      </section>
    </>
  )
}

export default TrackerPage
