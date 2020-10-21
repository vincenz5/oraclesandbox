grade = "VERY SECURE";

gradeAmount = 0;
		
function updateGrade() {
    grade = this.grade;
    document.getElementById("currentGrade").innerHTML = grade;

    console.log("Current grade amount: " , this.gradeAmount);
}

function upgradeGrade() {
    grade = this.grade;
    gradeAmount = this.gradeAmount;

    this.grade = grade + "+ 1";
    this.gradeAmount = gradeAmount + 1;

    console.log("Current grade amount: " , this.gradeAmount);
}