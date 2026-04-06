import { useState } from 'react'
import HabitForm from './components/HabitForm'
import HabitFilters from './components/HabitFilters'
import HabitList from './components/HabitList'
import StatsPanel from './components/StatsPanel'
import './App.css'

const initialHabits = [
  {
    id: 1,
    title: 'Утренняя зарядка',
    category: 'Здоровье',
    streak: 6,
    doneToday: true,
  },
  {
    id: 2,
    title: 'Чтение 20 минут',
    category: 'Обучение',
    streak: 4,
    doneToday: false,
  },
  {
    id: 3,
    title: 'Практика React',
    category: 'Карьера',
    streak: 9,
    doneToday: true,
  },
]

function App() {
  const [habits, setHabits] = useState(initialHabits)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingHabit, setEditingHabit] = useState(null)

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    if (statusFilter === 'done') {
      return matchesSearch && habit.doneToday
    }

    if (statusFilter === 'active') {
      return matchesSearch && !habit.doneToday
    }

    return matchesSearch
  })

  const handleSaveHabit = (habitData) => {
    if (editingHabit) {
      setHabits((currentHabits) =>
        currentHabits.map((habit) =>
          habit.id === editingHabit.id ? { ...habit, ...habitData } : habit,
        ),
      )
      setEditingHabit(null)
      return
    }

    const newHabit = {
      id: Date.now(),
      ...habitData,
      doneToday: false,
    }

    setHabits((currentHabits) => [newHabit, ...currentHabits])
  }

  const handleDeleteHabit = (habitId) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== habitId),
    )

    if (editingHabit?.id === habitId) {
      setEditingHabit(null)
    }
  }

  const handleToggleHabit = (habitId) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== habitId) {
          return habit
        }

        const nextDoneToday = !habit.doneToday

        return {
          ...habit,
          doneToday: nextDoneToday,
          streak: nextDoneToday
            ? habit.streak + 1
            : Math.max(habit.streak - 1, 0),
        }
      }),
    )
  }

  const handleStartEdit = (habit) => {
    setEditingHabit(habit)
  }

  const completedCount = habits.filter((habit) => habit.doneToday).length

  return (
    <main className="app-shell">
      <section className="hero-section">
        <div>
          <p className="eyebrow">Индивидуальный mini-project</p>
          <h1>Habit Flow</h1>
          <p className="hero-text">
            Трекер привычек на React с добавлением, редактированием,
            удалением, поиском и фильтрацией записей.
          </p>
        </div>
        <StatsPanel total={habits.length} completed={completedCount} />
      </section>

      <section className="content-grid">
        <HabitForm
          key={editingHabit ? editingHabit.id : 'new-habit'}
          editingHabit={editingHabit}
          onSaveHabit={handleSaveHabit}
          onCancelEdit={() => setEditingHabit(null)}
        />

        <div className="list-panel">
          <HabitFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
          />

          <HabitList
            habits={filteredHabits}
            onToggleHabit={handleToggleHabit}
            onEditHabit={handleStartEdit}
            onDeleteHabit={handleDeleteHabit}
          />
        </div>
      </section>
    </main>
  )
}

export default App
