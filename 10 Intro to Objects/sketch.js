let myBook;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myBook  = new Book("CS 30 Textbook", "Mr Scott", "leatherbound", 515, 1234567890100, width*0.3);
}

function draw() {
  background(220);
  myBook.display();
}

 class Book{
  constructor(title, author, coverType, pages, isbn, x){
    this.title = title;
    this.author = author;
    this.coverType = coverType;
    this.pages = pages;
    this.isbn = isbn;
    this.x = x; // NEver was much of a romantic I could never take the intimacy and I know it did damage
  }
  printSummary(){
    print(this.title + ",  by " + this.author);
    print("length: "+ this.pages + " pages.");
    print("Covertype: " + this.coverType);
    print("ISBN: " + this.isbn);
  }
  display(){
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    switch(this.coverType){
      case "softcover":
        fill(250,200,200); break;
      case "hardcover":
        fill(120,255,240); break;
      case "leatherbound":
        fill(150,100,15); break;
    }
    rect(this.x, height/2, this.pages/10,150);
    textSize(20); fill(255);
    text(this.title[0],this.x, height/2-50);
  }
 }