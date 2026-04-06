import { useState } from 'react'

const emptyForm = {
  title: '',
  category: 'Здоровье',
  streak: 1,
}

function HabitForm({ editingHabit, onSaveHabit, onCancelEdit }) {
  const [formData, setFormData] = useState(() =>
    editingHabit
      ? {
          title: editingHabit.title,
          category: editingHabit.category,
          streak: editingHabit.streak,
        }
      : emptyForm,
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: name === 'streak' ? Number(value) : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim()) {
      return
    }

    onSaveHabit({
      title: formData.title.trim(),
      category: formData.category,
      streak: formData.streak,
    })

    setFormData(emptyForm)
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-label">Управление привычкой</p>
          <h2>{editingHabit ? 'Редактирование' : 'Новая привычка'}</h2>
        </div>
        {editingHabit && <span className="badge">Режим редактирования</span>}
      </div>

      <form className="habit-form" onSubmit={handleSubmit}>
        <label>
          Название
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например, выпить 2 литра воды"
          />
        </label>

        <label>
          Категория
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Здоровье">Здоровье</option>
            <option value="Обучение">Обучение</option>
            <option value="Карьера">Карьера</option>
            <option value="Личное">Личное</option>
          </select>
        </label>

        <label>
          Текущая серия дней
          <input
            type="number"
            name="streak"
            min="1"
            value={formData.streak}
            onChange={handleChange}
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {editingHabit ? 'Сохранить изменения' : 'Добавить привычку'}
          </button>
          {editingHabit && (
            <button
              type="button"
              className="secondary-button"
              onClick={onCancelEdit}
            >
              Отмена
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default HabitForm
