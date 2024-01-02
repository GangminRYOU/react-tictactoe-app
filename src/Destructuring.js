
const destructuringPractice = () => {
    let person = {
        name: 'Maya',
        age: 30,
        phone: '123',
        address: {
          zipcode: 1234,
          street: 'rainbow',
          number: 42
        }
      }
    
      let {address: {zipcode, street, number}} = person;
      console.log(zipcode, street, number);

      let a, b, rest;
      [a, b] = [10, 20];
      console.log(a, b);
      [a, b, ...rest] = [10, 20, 30, 40, 50];
      console.log(rest);

      const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      const [day1, day2, day3, day4, day5] = week;
      console.log(day1, day2, day3, day4, day5);

      const numbers = [1, 2, 3, 4, 5, 6];
      const [, , three, , five] = numbers;
      console.log(three, five);

      const studentDetails = {
        firstName: 'John',
        lastName: 'Mary'
      }

      const {firstName: fName = 'not given', lastName} = studentDetails;
      console.log(fName);
      console.log(lastName);
}

export default destructuringPractice;