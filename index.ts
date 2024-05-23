import inquirer from "inquirer"
import { faker } from '@faker-js/faker';

// requirement
// 1 user data = done
// 2 atm machine = done
// 3 atm function

interface user {
    id:number
    pin:number
    name:string
    accountNumber:number
    balance:number
}

const createUser = ()=>{
    let users:user[] = []

    for(let i = 0; i < 5; i++){
        let user:user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 900000000),
            balance:1000000 * i,
    };
    users.push(user);
    }
    
    return users;
};

// const user = createUser()

// consol.log(users)

// atm machine

const atmMachine = async(users:user[])=>{

    const res = await inquirer.prompt({
        type:"number",
        message:"write pin code",
        name:"pin"
    })

    const user = users.find(val => val.pin == res.pin)
        if(user){
         console.log(`Welcom ${user.name}`)

         atmFunc(user)

         return;
    }
    console.log("Invalid user pin");

    // console.log(res)

};

// atm function

const atmFunc = async(user:user)=>{
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "kia karna chahte ho...",
        choices: ["withdraw","balance", "deposite","exit"]
    })

    if(ans.select == "withdraw"){
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter amount.",
            name: "rupee"
        })

        if(amount.rupee > user.balance){
            return console.log("mojuda balance nakafi hai..")
        }

        
        if(amount.rupee > 25000){
            return console.log("app 25000 se ziada ki amount nahi nikal sakty")
        }

        console.log(`withdraw amount: ${amount.rupee}`)
        console.log(`Balance: ${user .balance-amount.rupee}`)


    }

    if(ans.select == "balance"){
        console.log(`Balance: ${user .balance}`)
        return
    }

    if(ans.select == "deposite"){
        const deposite = await inquirer.prompt({
           type:"number",
           message:"sDeposite amount enter",
           name:"rupee" 
        }) 
        console.log(`Deposite amount: ${deposite.rupee}`)
        console.log(`Total Balance: ${user.balance + deposite.rupee}`)
    }

    if(ans.select == "exit"){
        console.log("Thanks for using atm...")
    }

    // console.log(ans)
}


const users = createUser()

atmMachine(users)






