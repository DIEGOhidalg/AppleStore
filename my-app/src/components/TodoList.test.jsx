import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from './TodoList'

describe('TodoList', () => {
  it('renderiza el título y la lista vacía', () => {
    render(<TodoList />)
    const titulo = screen.getByRole('heading', { name: /Mis Tareas/i })
    const lista = screen.getByTestId('list')
    expect(titulo).toBeInTheDocument()
    expect(lista.children.length).toBe(0)
  })

  it('agrega una tarea al hacer clic en "Agregar"', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Nueva tarea')
    const boton = screen.getByTestId('add')
    fireEvent.change(input, { target: { value: 'Comprar pan' } })
    fireEvent.click(boton)
    expect(screen.getByText('Comprar pan')).toBeInTheDocument()
  })

  it('no agrega tareas vacías', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Nueva tarea')
    const boton = screen.getByTestId('add')
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(boton)
    const lista = screen.getByTestId('list')
    expect(lista.children.length).toBe(0)
  })

  it('agrega tarea al presionar Enter', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Nueva tarea')
    fireEvent.change(input, { target: { value: 'Estudiar Jasmine' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(screen.getByText('Estudiar Jasmine')).toBeInTheDocument()
  })

  it('elimina una tarea', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Nueva tarea')
    const boton = screen.getByTestId('add')
    fireEvent.change(input, { target: { value: 'A' } })
    fireEvent.click(boton)
    fireEvent.change(input, { target: { value: 'B' } })
    fireEvent.click(boton)
    fireEvent.click(screen.getByTestId('del-0'))
    const lista = screen.getByTestId('list')
    expect(lista.children.length).toBe(1)
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
