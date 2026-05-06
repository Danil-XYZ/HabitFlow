import { useEffect, useMemo, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import IdeasPage from './pages/IdeasPage'
import TrackerPage from './pages/TrackerPage'
import './App.css'

const HABITS_STORAGE_KEY = 'habit-flow-habits'
const THEME_STORAGE_KEY = 'habit-flow-theme'

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

const apiFallbackIdeas = [
  {
    id: 'fallback-1',
    title: 'Планировать день утром',
    category: 'Личное',
    streak: 1,
    doneToday: false,
    sourceTitle: 'fallback',
  },
  {
    id: 'fallback-2',
    title: 'Повторять новые слова',
    category: 'Обучение',
    streak: 1,
    doneToday: false,
    sourceTitle: 'fallback',
  },
  {
    id: 'fallback-3',
    title: 'Делать короткую прогулку',
    category: 'Здоровье',
    streak: 1,
    doneToday: false,
    sourceTitle: 'fallback',
  },
]

const ideaTitles = [
  'Проверить список задач',
  'Разобрать учебные заметки',
  'Сделать 10-минутную разминку',
  'Подготовить рабочее место',
  'Повторить материал по React',
  'Записать итоги дня',
]

const ideaCategories = ['Личное', 'Обучение', 'Здоровье', 'Карьера']

function readStoredHabits() {
  const savedHabits = localStorage.getItem(HABITS_STORAGE_KEY)

  if (!savedHabits) {
    return initialHabits
  }

  try {
    const parsedHabits = JSON.parse(savedHabits)
    return Array.isArray(parsedHabits) ? parsedHabits : initialHabits
  } catch {
    return initialHabits
  }
}

function readStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
}

function App() {
  const [habits, setHabits] = useState(readStoredHabits)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingHabit, setEditingHabit] = useState(null)
  const [theme, setTheme] = useState(readStoredTheme)
  const [apiIdeas, setApiIdeas] = useState([])
  const [apiStatus, setApiStatus] = useState('loading')
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const controller = new AbortController()

    async function loadIdeas() {
      try {
        setApiStatus('loading')
        setApiError('')

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=6',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('API request failed')
        }

        const todos = await response.json()
        const normalizedIdeas = todos.map((todo, index) => ({
          id: todo.id,
          title: ideaTitles[index] ?? todo.title,
          category: ideaCategories[index % ideaCategories.length],
          streak: 1,
          doneToday: false,
          sourceTitle: todo.title,
        }))

        setApiIdeas(normalizedIdeas)
        setApiStatus('success')
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setApiIdeas(apiFallbackIdeas)
        setApiStatus('error')
        setApiError('Не удалось загрузить данные из API, показан резервный список.')
      }
    }

    loadIdeas()

    return () => controller.abort()
  }, [])

  const filteredHabits = useMemo(
    () =>
      habits.filter((habit) => {
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
      }),
    [habits, searchTerm, statusFilter],
  )

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

  const handleAddIdea = (idea) => {
    const newHabit = {
      id: Date.now(),
      title: idea.title,
      category: idea.category,
      streak: idea.streak,
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

  const completedCount = habits.filter((habit) => habit.doneToday).length

  return (
    <main className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand-link">
          Habit Flow
        </NavLink>

        <nav className="app-nav" aria-label="Основная навигация">
          <NavLink to="/">Трекер</NavLink>
          <NavLink to="/ideas">Идеи из API</NavLink>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={() =>
            setTheme((currentTheme) =>
              currentTheme === 'light' ? 'dark' : 'light',
            )
          }
        >
          {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
        </button>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <TrackerPage
              habits={habits}
              filteredHabits={filteredHabits}
              completedCount={completedCount}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              editingHabit={editingHabit}
              onSaveHabit={handleSaveHabit}
              onCancelEdit={() => setEditingHabit(null)}
              onSearchChange={setSearchTerm}
              onStatusChange={setStatusFilter}
              onToggleHabit={handleToggleHabit}
              onEditHabit={setEditingHabit}
              onDeleteHabit={handleDeleteHabit}
            />
          }
        />
        <Route
          path="/ideas"
          element={
            <IdeasPage
              ideas={apiIdeas}
              status={apiStatus}
              error={apiError}
              habitCount={habits.length}
              onAddIdea={handleAddIdea}
            />
          }
        />
      </Routes>
    </main>
  )
}

export default App
