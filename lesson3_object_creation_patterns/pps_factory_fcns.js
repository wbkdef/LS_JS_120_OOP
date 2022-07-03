console.log(`\n --------------- problems 2 ---------------`);
function makeObj() {
  let obj = {
    propA: 10, 
    propB: 20
  };
  return obj;
}


console.log(`\n --------------- problems 3 ---------------`);
function createInvoice(services) {
  let obj = {
    phone: 3000,
    internet: 5500,
    payments: [],
    addPayment(payment) {
      this.payments.push(payment);
    },
    addPayments(payments) {
        this.payments.push(...payments);
    }, 
    total() {
      let tot = this.phone + this.internet;
      return tot;
    },
    paymentTotal() {
      return this.payments.reduce((pv, payment) => pv + payment.total(), 0);
    }, 
    amountDue() {
      return this.total() - this.paymentTotal();
    },
  };
  return Object.assign(obj, services)
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));
// const util = require('util');
// console.log(util.inspect(invoices, { showHidden: false, depth: null, colors: true }));
console.log(invoiceTotal(invoices)); // 31000


console.log(`\n --------------- problems 4 ---------------`);
function createPayment(services) {
  let payment = {
    internet: 0,
    phone: 0,
    amount: null,
    total() {
      if (this.amount !== null) {
        return this.amount;
      }
      return this.internet + this.phone;
    }
  }
  return Object.assign(payment, services);
  // implement the factory function here
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000


console.log(`\n --------------- problems 5 ---------------`);
let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

console.log(invoice.amountDue());       // this should return 5200
invoice.addPayment(payment1);
console.log(invoice.amountDue());       // this should return 3200
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0