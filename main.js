img="";
statusa="";
ans=[];
song=new Audio("mixkit-facility-alarm-908.wav");

function preload() {
    //img=loadImage("https://th.bing.com/th/id/OIP.ilkkyRL3ff4I0kIlb735UwHaJm?pid=ImgDet&rs=1");
}

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();

    vedio=createCapture(VIDEO);
    vedio.size(380,380);
    vedio.hide();

    od=ml5.objectDetector("cocossd",modalLoaded);
}

function draw() {
    image(vedio,0,0,640,420);
    r=random(125);
    b=random(125);
    g=random(125);
    if(statusa!=""){
        od.detect(vedio,gotResults);
        if (ans.length<1) {
            song.play();
            console.log(2*50);
            document.getElementById("status").innerHTML="Nothing Found";
        }
        else {
            song.pause();
            console.log(23*45);
            document.getElementById("status").innerHTML="Thing/s Found";
        }
        for(i=0;i<ans.length; i++) {
            fill(r,g,b);
            percent=floor(ans[i].confidence*100);
            text(ans[i].label+ " "+percent+"% ", ans[i].x,ans[i].y);
            noFill();
            stroke(r,g,b);
            rect(ans[i].x,ans[i].y,ans[i].width,ans[i].height);
        }
    }
}

function modalLoaded() {
    statusa=true;
    console.log("modal is loaded");
    
}

function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        ans=results;
    }
}

function back() {
    window.location="index.html";
}