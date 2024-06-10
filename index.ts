#! /usr/bin/env node
import inquirer from "inquirer";
 // define a student class 
class student {
    static counter =10000;
    id : number;
    name : string;
    courses : string[];
    balance: number;
    
constructor(name :string){
    this.id=student.counter++;
    this.name =name;
    this.courses =[];
    this.balance=100;

}
//methode to enroll a student in a course
enroll_Course (course :string){
this.courses.push(course);
}
// method to view student balance

view_balance(){
    console.log(`balance for${this.name} : ${this.balance}`);
    
}

//method to pay student fee
pay_fees(amount :number){
this.balance-= amount;
console.log(`$${amount} fees paid successfully for ${this.name} `);

}
//method to desplay student status
 show_status (){
    console.log(`ID: ${this.id}`);
    console.log(`NAME :${this.name}`);
    console.log(`Courses:${this.courses}`);
    console.log(`BALANCE:${this.balance}`);
    
    
    
    
 }
}

// defining a student manager class to manage students

class student_manager{
    students : student[]

    constructor(){
        this.students=[];
    }

    // method to add a new student

    add_student(name:string){
     let Student = new student(name);
   this.students.push(Student);
console.log(`student: ${name} added succssesfully.student ID:${Student.id}`);

    }

    // methode to enroll a student for a course

enroll_student(student_id:number,course : string){
let student = this.find_student(student_id);

if (student){
    student.enroll_Course(course);
    console.log(`${student.name} enrolled in ${course} successfully`);
    
}
}

//method to view a student balance

view_student_balance (student_id:number){
    let student = this.find_student(student_id);

if (student){
    student.view_balance();

}
else{
    console.log('student not found.please enter a correct student ID');
    
}


}

// method to pay student fee
pay_student_fees(student_id:number,amount:number){
let student=this.find_student(student_id);
if (student){
    student.pay_fees(amount);
}
else{
    console.log('student not found.please enter a correct student ID');

}
}
//method to display student status
show_student_status(student_id:number){
    let student=this.find_student(student_id);
if(student){
    student.show_status();
}
}




//method to find a student by student_id
find_student(student_id:number){
    return this.students.find(std=>std.id===student_id);
}


}

// main function to run the program
async function main() {
    console.log('welcome to student managment system');
    console.log("-".repeat(50));

    let Student_manager= new student_manager();

    //while loop to keep program running

    while(true){
let choice =await inquirer.prompt([
    {
        name:"choice",
        type:"list",
        message:"select an option",
        choices:[
            "Add student",
            "Enroll student",
            "view student balance",
            "pay fees",
            "show status",
            "exit"
        ]
    }
]);

//using switch case to handle user choice
switch(choice.choice){
    case "Add student":
    let name_input = await inquirer.prompt([
        {
            name:"Name",
            type:"input",
            message:"enter a student name",

        },
    ]);
    Student_manager.add_student(name_input.Name);
break;

case  "Enroll student":
    let course_input =await inquirer.prompt([
       
        {
            name:"student id",
            type:"number",
            message:"enter a student id",

        },
        {
            name:"course",
            type:"input",
            message:"enter a course name",

        },


    ]);
Student_manager.enroll_student(course_input.student_id,course_input.course);
    break;
case "view student balance":
    let balance_input=await inquirer.prompt([
        {
            name:"student ID",
            type:"number",
            message:"enter a student id",

        },
    ]);
    Student_manager.view_student_balance(balance_input.student_ID);
    break;
    case "pay fees":
        let fees_input = await inquirer.prompt([
        {
                name:"student id",
                type:"number",
                message:"Enter a student id",
        },
        {
                name:"amount",
                type:"number",
                message:"enter the amount to pay",

        },
    ]);
        Student_manager.pay_student_fees(fees_input.student_id,fees_input.amount);
     break;
     case "show status":
            let status_input = await inquirer.prompt([
        {
                    name:"student id",
                    type:"number",
                    message:"Enter a student ID",

        },
    ]);
            Student_manager.show_student_status(status_input.student_id);
            break;
            case "exit":
                console.log("Exiting....");
                process.exit();
                
}
    }
}

// calling a main function
main();