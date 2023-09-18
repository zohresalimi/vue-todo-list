import { mount } from '@vue/test-utils'
import TodoInput from '@/components/TodoInput.vue'

describe('TodoInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(TodoInput)
    expect(wrapper.exists()).toBe(true)
  })

  it('emits addTodo event when the form is submitted', async () => {
    const wrapper = mount(TodoInput)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Test todo')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper?.emitted('addTodo')).toBeTruthy()
    expect(wrapper?.emitted('addTodo')?.[0]).toEqual(['Test todo'])
  })

  it('updates todoContent when input value changes', async () => {
    const wrapper = mount(TodoInput)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Test todo')
    expect((wrapper.vm as unknown as { todoContent: string })?.todoContent).toBe('Test todo')
  })

  it('handles item selection from DropdownSearch', async () => {
    const wrapper = mount(TodoInput)
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Call @lu');

    (wrapper.vm as unknown as { handleItemSelect: (a?: string) => void }).handleItemSelect('Luke Skywalker')
    expect((wrapper.vm as unknown as { todoContent: string }).todoContent).toContain(`Call Luke Skywalker`)
  })

  it('computes the searchTerm correctly', async () => {
    const wrapper = mount(TodoInput)
    const input = wrapper.find('input[type="text"]')
    
    // Test case 1: No search term
    await input.setValue('Test todo')
    expect((wrapper.vm as unknown as { searchTerm: string }).searchTerm).toBe('')

    // Test case 2: Search term present
    await input.setValue('Test @search')
    expect((wrapper.vm as unknown as { searchTerm: string }).searchTerm).toBe('search')
  })
})
