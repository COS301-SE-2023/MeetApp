export const getGreeting = () => cy.get('h1');
export const getRandomString=() =>{ let result = '';
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
for (let i = 0; i < 10; i++) {
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;};