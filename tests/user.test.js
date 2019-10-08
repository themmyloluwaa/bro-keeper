import { isValidPassword, getFirstName, getLastName} from '../src/utils/user.js'

test('should return true', () => {
    const password = isValidPassword('goaaaaaaaaaaaaat');

    expect(password).toBeTruthy();
})

test('should get first name', () => {
    const name = getFirstName('Temi Ojo');

    expect(name).toBe('Temi');
})

test('should get last name', ()=>{
    const name = getLastName('Temi Ojo');

    expect(name).toBe('Ojo')
})