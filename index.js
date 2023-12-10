const express = require("express");
const fs = require("fs");
const admin = require("./admin.json");
const teacher = require("./teacher.json");
const student = require("./student.json");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/HTML/selectLogin.html");
});

app.get("/selectLogin", function (req, res) {
  res.sendFile(__dirname + "/HTML/selectLogin.html");
});

app.get("/adminLogin", function (req, res) {
  res.sendFile(__dirname + "/HTML/adminLogin.html");
});

app.get("/teacherLogin", function (req, res) {
  res.sendFile(__dirname + "/HTML/teacherLogin.html");
});

app.get("/studentLogin", function (req, res) {
  res.sendFile(__dirname + "/HTML/studentLogin.html");
});

app.get("/StudentPortal", function (req, res) {
  res.sendFile(__dirname + "/HTML/StudentPortal.html");
});

app.get("/studentInfo", function (req, res) {
  res.sendFile(__dirname + "/HTML/studentInfo.html");
});

app.get("/TeacherPortal", function (req, res) {
  res.sendFile(__dirname + "/HTML/TeacherPortal.html");
});

app.get("/AdminPortal", function (req, res) {
  res.sendFile(__dirname + "/HTML/AdminPortal.html");
});

app.post("/login/admin", function requestHandler(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const acList = admin.Accounts;

  let flag = "false";

  acList.map((ac) => {
    if (ac.username == username && ac.password == password) {
      flag = "true";
    }
  });

  res.send(flag);
});

app.post("/login/teacher", function requestHandler(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const acList = teacher.Accounts;

  let flag = "false";

  acList.map((ac) => {
    if (ac.username == username && ac.password == password) {
      flag = "true";
    }
  });

  res.send(flag);
});

app.post("/login/student", function requestHandler(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const acList = student.Accounts;

  let flag = "false";

  acList.map((ac) => {
    if (ac.username == username && ac.password == password) {
      flag = "true";
    }
  });

  res.send(flag);
});

app.post("/student/getInfo", function requestHandler(req, res) {
  const username = req.body.username;

  const InfoList = student.Info;

  let myInfo = {};

  InfoList.map((ac) => {
    if (ac.username == username) {
      myInfo = ac;
    }
  });

  res.send(myInfo);
});

app.post("/teacher/getInfo", function requestHandler(req, res) {
  const username = req.body.username;

  const InfoList = student.Info;

  res.send(InfoList);
});

app.post("/update/student", function requestHandler(req, res) {
  const name = req.body.name;

  let studentFile = JSON.parse(fs.readFileSync("./student.json", "utf8"));

  studentFile.Info.map((student) => {
    if (student.name == name) {
      student.gpa = req.body.gpa;
      student.sub1 = req.body.sub1;
      student.sub2 = req.body.sub2;
      student.sub3 = req.body.sub3;
      student.sub4 = req.body.sub4;
    }
  });

  fs.writeFileSync("./student.json", JSON.stringify(studentFile));

  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
