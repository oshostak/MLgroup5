var training;

var learning_rate = 0.1;

var final0 = 0;
var final1 = 1;
var counter = 0;


function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('#canvascontainer');
  canvas.mousePressed(addPoints);
  training = [];
}

function addPoints() {

  var theta0 = 0;
  var theta1 = 0;
  // Add a data point
  training.push(createVector(mouseX / width, mouseY / height));
  console.log("point addded");

  var temp0 = 0;
  var temp1 = 0;
  var temp_sum_theta0 = 0;
  var temp_sum_theta1 = 0;
  var learning_rate = 0.2;

  untilConvergence(theta0, theta1, learning_rate, training);

  function untilConvergence(theta0, theta1, learning_rate, training){
    var temp0 = 0;
    var temp1 = 0;
    var se_final = 0;

    if (training.length<2) {
      return theta0, theta1;
    }

    else{
      var temp_sum_theta0 = 0;
      var temp_sum_theta1 = 0;
      var se_sum = 0;
      for (var i = 0; i < training.length; i++) {
        var x = training[i].x;
        var y = training[i].y;
        temp_sum_theta0 += (theta0+theta1*x - y);
        temp_sum_theta1 += (theta0+theta1*x - y)*x;
        se_sum += (theta0+theta1*x - y)*(theta0+theta1*x - y);
      }

      temp0 = theta0 - learning_rate/training.length*temp_sum_theta0;
      temp1 = theta1 - learning_rate/training.length*temp_sum_theta1;

      if (abs(temp0-theta0)<0.00001) {
        if (abs(temp1-theta1)<0.00001){
          theta0=temp0;
          theta1=temp1;
          document.getElementById("theta0").innerHTML = (1-temp0);
          document.getElementById("theta1").innerHTML = (-temp1);
          document.getElementById("reg_line").innerHTML = (1-temp0)+"+"+(-temp1)+"x";
          counter +=1;
          final0 = temp0;
          final1 = temp1;
          se_final = sqrt(se_sum/training.length);
          console.log("Standard error: "+se_final);
          document.getElementById("se_l").innerHTML = se_final;
        }

        else{
          theta0 = temp0;
          theta1 = temp1;
          untilConvergence(theta0, theta1, learning_rate, training);
        }
      }

      else{
        theta1 = temp1;
        theta0 = temp0;
        untilConvergence(theta0, theta1, learning_rate, training);
      }
    }
  }
}

function draw() {
  background(51);
  drawPoints();
  if (counter>0) {
      line(0, final0*height, 1*width, (final0+final1)*height);
  }
}    

function drawPoints() {
  stroke(255);
  fill(255);
  for (var i = 0; i < training.length; i++) {
    ellipse(training[i].x * width, training[i].y * height, 8, 8);
  }
}