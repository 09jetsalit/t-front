import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Modal = ({ onClose }) => {
  const [fullname, setFullname] = useState("");
  const [nickname, setNickname] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");

  const handleData = async () => {
  const data = {
    fullname: fullname,
    nickname: nickname,
    date0fbirth: dob,
    age: age,
    gender: gender,
  }
  try {
    const resposedata = await axios.post("/", data);
    if (resposedata.status === 200 && resposedata.data) {
        return <Link to='/' />;
    }
  } catch (error) {
    console.log(error);
  }
}

  const handleDOBChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDob(selectedDate.toISOString().split("T")[0]);

    // คำนวณอายุจากวันเกิดที่ผู้ใช้เลือก
    const currentDate = new Date();
    const birthDate = new Date(selectedDate);
    let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value.toLowerCase();
    if (selectedGender === "other") {
      setOtherGender("");
    }
    setGender(selectedGender);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blue-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="modal-content bg-white p-2 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-2 text-xl pt-3">Add Member</div>
        <form
          className="flex flex-col pr-20 pl-20"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* fullname */}
          <label htmlFor="fullname" className="flex flex-col items-center">
            Full name:{" "}
          </label>
          <input
            className="rounded-md border-2 border-slate-400"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value.toLowerCase())}
            placeholder=" example: John Smith"
            required
          ></input>
          {/* nickname */}
          <label htmlFor="nickname" className="flex flex-col items-center">
            Nickname:{" "}
          </label>
          <input
            className="rounded-md border-2 border-slate-400"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.toLowerCase())}
            placeholder=" example: Michel"
            required
          ></input>
          {/* date of birth */}
          <label htmlFor="DOB" className="flex flex-col items-center">
            Date of Birth:{" "}
          </label>
          <input
            type="date"
            className="rounded-md border-2 border-slate-400 text-center"
            name="DOB"
            value={dob}
            onChange={handleDOBChange}
            max={new Date().toISOString().split("T")[0]} // กำหนด max เป็นวันปัจจุบัน
            required
          ></input>
          {/* age */}
          <label htmlFor="age" className="flex flex-col items-center">
            Age:{" "}
          </label>
            {/* Flexbox container */}
            <input
              type="number"
              className="rounded-md border-2 border-slate-400 text-center" // เพิ่ม text-center เพื่อจัดวางข้อความใน input ตรงกลาง
              name="age"
              value={age}
              readOnly // ตั้งค่าให้เป็นอ่านอย่างเดียว
              required
            ></input>
          {/* gender */}
          <label htmlFor="gender" className="flex flex-col items-center">
            Gender:{" "}
          </label>
          <div className="flex items-center">
            <label htmlFor="male" className="mr-2">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleGenderChange}
                required
              />
              Male
            </label>
            <label htmlFor="female" className="mr-2">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleGenderChange}
                required
              />
              Female
            </label>
            <label htmlFor="other">
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                onChange={handleGenderChange}
                required
              />
              Other
            </label>
          </div>
          {gender === "other" && (
            <div className="mt-2">
              <label
                htmlFor="otherGender"
                className="flex flex-col items-center"
              >
                Other Gender:{" "}
              </label>
              <input
                type="text"
                className="rounded-md border-2 border-slate-400"
                name="otherGender"
                value={otherGender}
                onChange={(e) => setOtherGender(e.target.value.toLowerCase())}
                placeholder="specify other gender"
                required
              ></input>
            </div>
          )}
          <div className="flex flex-row justify-center items-center flex-nowrap">
          <button onClick={handleData} className="bg-blue-500 rounded-md hover:bg-blue-200 p-1.5 mr-2 mt-2 mb-4">Summit</button>
          <button onClick={onClose} className="p-1.5 mr-2 mt-2 mb-4">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
