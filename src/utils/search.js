export const includesOnSearch = (inputValue, fields = []) => {
    const enter = inputValue.replaceAll(' ', '').toLowerCase().replaceAll('ç', 'c').normalize('NFD')
    const prepare = fields.join('').replaceAll(' ', '').toLowerCase().replaceAll('ç', 'c').normalize('NFD')
    return prepare.includes(enter)
}